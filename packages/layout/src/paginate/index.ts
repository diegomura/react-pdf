import * as P from '@react-pdf/primitives';
import { omit } from '@react-pdf/fns';
import { createPaginator } from '@react-pdf/paginate';
import type { Item } from '@react-pdf/paginate';
import FontStore from '@react-pdf/font';

import isFixed from '../node/isFixed';
import hasDynamic from '../node/hasDynamic';
import renderDynamic from '../node/renderDynamic';
import relayoutPage from '../steps/relayoutPage';
import fromPage from './fromPage';
import toItems from './toItems';
import {
  PageLayout,
  collectContent,
  findProbe,
  identityLayout,
  instantiateTemplate,
  probeElement,
} from '../page/template';
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

const numeric = (value: unknown): number =>
  typeof value === 'number' ? value : 0;

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

// Every page is a template instantiated per output page. The payload rides
// through as the layout's children: a probe when measuring the flow region,
// the page's fragments when building. Region height may vary per page;
// width may not, since content was measured once at that width.
const splitPage = (
  page: SafePageNode,
  props: DynamicEnv['props'],
  { fontStore, yoga }: Ctx,
): SafePageNode[] => {
  const template: PageLayout = (page.props as any)?.layout || identityLayout;

  const env: DynamicEnv = {
    props,
    measure: (node, nodeProps) =>
      measureDynamic(page, node, nodeProps, fontStore, yoga),
  };

  // Content sits inline wherever the template rendered it, tagged by the
  // splice step; tree order is source order.
  const content = collectContent(page as unknown as SafeNode);
  const inFlow = content.filter((child) => !isAbsolute(child));

  const root: Item = { kind: 'column', children: toItems(inFlow, env) };
  const paginator = createPaginator(root);

  const box = { ...page.box, height: page.style.height as number };

  const instantiate = (pageProps: DynamicPageProps, payload: SafeNode[]) =>
    instantiateTemplate(template, pageProps, payload).map((node) =>
      renderDynamic(pageProps, node),
    );

  const measureRegion = (pageNumber: number) => {
    const nodes = instantiate(props(pageNumber), [probeElement() as any]);
    const fake = { ...page, box, children: nodes };
    const laid = relayoutPage(fake as any, fontStore, yoga) as SafePageNode;
    const probe = findProbe(laid)!;

    return absoluteBox(laid, probe)!;
  };

  // The page's fragments take the in-flow content's place; absolutes keep
  // their source positions — fixed ones on every page, plain ones on the
  // first — and anchor to whatever parent the template gave them.
  const payloadFor = (fragments: SafeNode[], index: number): SafeNode[] => {
    let placed = false;

    return content.flatMap((child): SafeNode[] => {
      if (isAbsolute(child)) {
        return isFixed(child) || index === 0 ? [child] : [];
      }

      if (placed) return [];
      placed = true;

      return fragments;
    });
  };

  const regionHeight = (region: { height: number }, pageNumber: number) => {
    if (page.props?.wrap === false) return Infinity;

    if (region.height <= 0) {
      throw new Error(
        `[layout] The page layout leaves no room for content on page ${pageNumber}.`,
      );
    }

    return region.height;
  };

  const pages: SafePageNode[] = [];
  let referenceWidth: number | null = null;
  let pageNumber = 1;

  while (!paginator.done) {
    const region = measureRegion(pageNumber);

    referenceWidth = referenceWidth ?? region.width;

    if (Math.abs(region.width - referenceWidth) > 0.001) {
      throw new Error(
        `[layout] The page layout changes the content width on page ${pageNumber} ` +
          `(${region.width} vs ${referenceWidth}). Chrome may vary in height per page, not width.`,
      );
    }

    const placed = paginator.next(regionHeight(region, pageNumber));
    const fragments = fromPage(placed[0]?.children || [], 0) as SafeNode[];

    const index = pageNumber - 1;
    const nodes = instantiate(props(pageNumber), payloadFor(fragments, index));

    const built = {
      ...page,
      box,
      props: index === 0 ? page.props : omit('bookmark', page.props),
      children: nodes,
    } as SafePageNode;

    pages.push(relayoutPage(built as any, fontStore, yoga) as SafePageNode);
    pageNumber += 1;
  }

  return pages;
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

  // A layout component may read totalPages from its params without any
  // render prop in its output, so template pages always take the totals round.
  const dynamic = root.children.some(
    (page) =>
      hasDynamic(page as unknown as SafeNode) || (page.props as any)?.layout,
  );

  if (!dynamic) return round1.root;

  const totals: Totals = {
    totalPages: round1.root.children.length,
    subTotals: round1.subTotals,
  };

  return paginateDocument(root, { ...ctx, totals }).root;
};

export default resolvePagination;
