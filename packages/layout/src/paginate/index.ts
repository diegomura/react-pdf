import * as P from '@react-pdf/primitives';
import { omit } from '@react-pdf/fns';
import { createPaginator, paginate } from '@react-pdf/paginate';
import type { Item } from '@react-pdf/paginate';
import FontStore from '@react-pdf/font';

import isFixed from '../node/isFixed';
import hasDynamic from '../node/hasDynamic';
import getContentArea from '../page/getContentArea';
import renderDynamic from '../node/renderDynamic';
import relayoutPage from '../steps/relayoutPage';
import fromPage from './fromPage';
import toItems from './toItems';
import { PageLayout, findSlot, instantiateTemplate } from './template';
import {
  DynamicPageProps,
  SafeDocumentNode,
  SafeNode,
  SafePageNode,
  YogaInstance,
} from '../types';
import { DynamicEnv } from './types';

// Page totals only exist once every page is counted, so documents with
// dynamic nodes paginate twice: round one with just the running pageNumber,
// round two with the full picture. Legacy froze round one's partition and
// relayouted instead; re-running is simpler and sizes rarely change.
type Totals = { totalPages: number; subTotals: number[] } | null;

// Document-wide dependencies, constant for a whole pagination round. Per-page
// numbering travels separately, baked into a props factory.
type Ctx = {
  totals: Totals;
  fontStore: FontStore;
  yoga: YogaInstance;
};

const isAbsolute = (node: SafeNode) => node.style?.position === 'absolute';

const isOutOfFlow = (node: SafeNode) => isFixed(node) || isAbsolute(node);

const contentTop = (page: SafePageNode) =>
  (page.box?.borderTopWidth || 0) + (page.box?.paddingTop || 0);

const numeric = (value: unknown): number =>
  typeof value === 'number' ? value : 0;

const outerTop = (node: SafeNode) =>
  (node.box?.top || 0) - numeric(node.box?.marginTop);

// Re-render a dynamic subtree and measure it at the width the first pass gave
// it. A throwaway page runs the subtree through the standard style and yoga
// steps; like the first pass, it has no height constraint so content can be
// any length.
const measureDynamic = (
  page: SafePageNode,
  node: SafeNode,
  props: DynamicPageProps,
  fontStore: FontStore,
  yoga: YogaInstance,
): SafeNode => {
  const rendered = renderDynamic(props, node);

  const width =
    (node.box?.width || page.box?.width || 0) +
    numeric(node.box?.marginLeft) +
    numeric(node.box?.marginRight);

  const fake = {
    type: P.Page,
    props: { dpi: (page.props as any)?.dpi },
    style: {
      width,
      height: page.style?.height,
      fontSize: page.style?.fontSize,
    },
    box: { width },
    children: [rendered],
  };

  const laid = relayoutPage(fake as any, fontStore, yoga) as SafePageNode;
  const measured = laid.children![0] as SafeNode;

  return { ...measured, box: { ...measured.box, top: 0 } } as SafeNode;
};

// Walk from `root` to `target` accumulating parent-relative tops and lefts
// into the page's coordinate space.
const absoluteBox = (
  root: SafeNode,
  target: SafeNode,
  top = 0,
  left = 0,
): { top: number; left: number; width: number; height: number } | null => {
  const boxTop = top + (root.box?.top || 0);
  const boxLeft = left + (root.box?.left || 0);

  if (root === target) {
    return {
      top: boxTop,
      left: boxLeft,
      width: root.box?.width || 0,
      height: root.box?.height || 0,
    };
  }

  for (const child of (root.children || []) as SafeNode[]) {
    const found = absoluteBox(child, target, boxTop, boxLeft);
    if (found) return found;
  }

  return null;
};

// A page with a `layout` prop: chrome repeats by definition, the slot's
// measured box is the flow region, and each page's chrome is instantiated
// with that page's props — so its height may vary per page. Width may not:
// content was measured once at slot width.
const splitTemplatePage = (
  page: SafePageNode,
  props: DynamicEnv['props'],
  { fontStore, yoga }: Ctx,
): SafePageNode[] => {
  const layout = (page.props as any).layout as PageLayout;

  const env: DynamicEnv = {
    props,
    measure: (node, nodeProps) =>
      measureDynamic(page, node, nodeProps, fontStore, yoga),
  };

  const contentSlot = findSlot(page)!;
  const content = (contentSlot.children || []) as SafeNode[];

  const root: Item = { kind: 'column', children: toItems(content, env) };
  const paginator = createPaginator(root);

  const box = { ...page.box, height: page.style.height as number };

  const measureChrome = (pageNumber: number) => {
    const pageProps = props(pageNumber);
    const nodes = instantiateTemplate(layout, pageProps).map((node) =>
      renderDynamic(pageProps, node as SafeNode),
    );

    const fake = { ...page, box, children: nodes };
    const laid = relayoutPage(fake as any, fontStore, yoga) as SafePageNode;
    const slot = findSlot(laid)!;
    const slotBox = absoluteBox(laid, slot)!;

    return { laid, slot, slotBox };
  };

  const referenceWidth = absoluteBox(page, contentSlot)!.width;
  const height = (slotBox: { height: number }, pageNumber: number) => {
    if (page.props?.wrap === false) return Infinity;

    if (slotBox.height <= 0) {
      throw new Error(
        `[layout] The page layout leaves no room for content on page ${pageNumber}.`,
      );
    }

    return slotBox.height;
  };

  const pages: SafePageNode[] = [];
  let pageNumber = 1;

  while (!paginator.done) {
    const { laid, slot, slotBox } = measureChrome(pageNumber);

    if (Math.abs(slotBox.width - referenceWidth) > 0.001) {
      throw new Error(
        `[layout] The page layout changes the content width on page ${pageNumber} ` +
          `(${slotBox.width} vs ${referenceWidth}). Chrome may vary in height per page, not width.`,
      );
    }

    const placed = paginator.next(height(slotBox, pageNumber));
    const flowNodes = fromPage(placed[0]?.children || [], 0);

    // Out-of-flow content children follow the standard page rules: fixed
    // repeats on every page, absolutes belong to the first.
    const index = pageNumber - 1;
    const outOfFlow = content.filter(
      (child) => isOutOfFlow(child) && (isFixed(child) || index === 0),
    );

    slot.children = [...flowNodes, ...outOfFlow] as any;

    const built = {
      ...laid,
      props: index === 0 ? page.props : omit('bookmark', page.props),
    } as SafePageNode;

    pages.push(relayoutPage(built as any, fontStore, yoga) as SafePageNode);
    pageNumber += 1;
  }

  return pages;
};

const splitPage = (
  page: SafePageNode,
  props: DynamicEnv['props'],
  { totals, fontStore, yoga }: Ctx,
): SafePageNode[] => {
  if ((page.props as any)?.layout) {
    return splitTemplatePage(page, props, { totals, fontStore, yoga });
  }

  const children = (page.children || []) as SafeNode[];

  const env: DynamicEnv = {
    props,
    measure: (node, nodeProps) =>
      measureDynamic(page, node, nodeProps, fontStore, yoga),
  };

  // Page padding comes off the height rather than entering the flow as
  // spacers, since it applies to every page.
  const root: Item = { kind: 'column', children: toItems(children, env) };

  // The engine can't take the content area directly: in-flow fixed nodes (a
  // repeating header) occupy the band above the first flow child on every
  // page, so flow content only gets the content area below that band. A page
  // that refuses to wrap is the same thing with no ceiling.
  const slot = children.findIndex((child) => !isOutOfFlow(child));
  const flowTop =
    slot === -1
      ? contentTop(page)
      : Math.max(outerTop(children[slot]), contentTop(page));

  const height =
    page.props?.wrap === false
      ? Infinity
      : contentTop(page) + getContentArea(page) - flowTop;

  const pages = paginate(root, height);

  const box = { ...page.box, height: page.style.height as number };

  return pages.map((placed, index) => {
    const flowNodes = fromPage(placed[0]?.children || [], flowTop);

    // The page is a template with one flow slot: fixed nodes repeat on every
    // page, a page-level absolute belongs to the page it was written on, and
    // the flow children collapse into the slot, which holds whatever landed
    // on the page being built. Dynamic out-of-flow content resolves against
    // the page number it ends up on.
    const rebuilt = children.flatMap((child, at): SafeNode[] => {
      if (!isOutOfFlow(child)) return at === slot ? flowNodes : [];
      if (!isFixed(child) && index > 0) return [];

      return [
        totals && hasDynamic(child)
          ? env.measure(child, props(index + 1))
          : child,
      ];
    });

    const built = {
      ...page,
      box,
      props: index === 0 ? page.props : omit('bookmark', page.props),
      children: rebuilt,
    } as SafePageNode;

    // The partition is settled and every fragment carries its decided height
    // in style, so re-laying the finished page at its real height can only do
    // what the unconstrained first pass could not: anchor absolutes against
    // the page bottom and hand out the leftover space.
    return relayoutPage(built as any, fontStore, yoga) as SafePageNode;
  }) as SafePageNode[];
};

const paginateDocument = (root: SafeDocumentNode, ctx: Ctx) => {
  let offset = 0;

  const subTotals: number[] = [];
  const children: SafePageNode[] = [];

  root.children.forEach((page, index) => {
    const { totals } = ctx;
    const pagesBefore = offset;

    // A page splits into several, so a dynamic node's props depend on which of
    // those it lands on — known only once the engine has run.
    const props = (enginePageNumber: number): DynamicPageProps => ({
      pageNumber: pagesBefore + enginePageNumber,
      totalPages: totals?.totalPages,
      subPageNumber: enginePageNumber,
      subPageTotalPages: totals?.subTotals[index],
    });

    const pages = splitPage(page, props, ctx);

    subTotals.push(pages.length);
    offset += pages.length;
    children.push(...pages);
  });

  return { root: { ...root, children } as SafeDocumentNode, subTotals };
};

/**
 * Pagination without a second layout pass: paginate decides the partition and
 * the adapter derives every box from the first Yoga run.
 *
 * @param root - Document node
 * @param fontStore - Font store
 * @returns Layout node
 */
const resolvePagination = (
  root: SafeDocumentNode,
  fontStore: FontStore,
): SafeDocumentNode => {
  const ctx = { totals: null, fontStore, yoga: root.yoga };
  const round1 = paginateDocument(root, ctx);

  const dynamic = root.children.some((page) =>
    hasDynamic(page as unknown as SafeNode),
  );

  if (!dynamic) return round1.root;

  const totals: Totals = {
    totalPages: round1.root.children.length,
    subTotals: round1.subTotals,
  };

  return paginateDocument(root, { ...ctx, totals }).root;
};

export default resolvePagination;
