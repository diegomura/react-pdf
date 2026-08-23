import { omit } from '@react-pdf/fns';
import { createPaginator } from '@react-pdf/paginate';
import FontStore from '@react-pdf/font';

import hasDynamic from '../node/hasDynamic';
import renderDynamic from '../node/renderDynamic';
import relayoutPage from '../steps/relayoutPage';
import fromPage from './fromPage';
import toFlow from './toFlow';
import {
  PageLayout,
  collectContent,
  findProbe,
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
import { PageCtx } from './types';

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

  for (const child of root.children || []) {
    const found = absoluteBox(child, target, boxTop, boxLeft);
    if (found) return found;
  }

  return null;
};

// Chrome may vary in height per page, never in width: content was measured
// once at the region's width. A region with no height means the chrome ate
// the page (legal only when the page has no ceiling).
const validateRegion = (
  region: { width: number; height: number },
  referenceWidth: number,
  pageNumber: number,
  wrap: boolean,
) => {
  if (Math.abs(region.width - referenceWidth) > 0.001) {
    throw new Error(
      `[layout] The page layout changes the content width on page ${pageNumber} ` +
        `(${region.width} vs ${referenceWidth}). Chrome may vary in height per page, not width.`,
    );
  }

  if (wrap && region.height <= 0) {
    throw new Error(
      `[layout] The page layout leaves no room for content on page ${pageNumber}.`,
    );
  }
};

// Every page is a template instantiated per output page. The payload rides
// through as the layout's children: a probe when measuring the flow region,
// the page's fragments when building. Region height may vary per page;
// width may not, since content was measured once at that width.
const splitPage = (
  page: SafePageNode,
  props: PageCtx['props'],
  { fontStore, yoga }: Ctx,
): SafePageNode[] => {
  const template: PageLayout | undefined = (page.props as any)?.layout;
  const box = { ...page.box, height: page.style.height as number };

  const pageCtx: PageCtx = { props, page, fontStore, yoga };
  const content = collectContent(page as unknown as SafeNode);

  const paginator = createPaginator(toFlow(content, pageCtx));

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

  const wrap = page.props?.wrap !== false;

  const pages: SafePageNode[] = [];

  let referenceWidth: number | null = null;
  let pageNumber = 1;

  while (!paginator.done) {
    const region = measureRegion(pageNumber);

    referenceWidth = referenceWidth ?? region.width;

    validateRegion(region, referenceWidth, pageNumber, wrap);

    const height = wrap ? region.height : Infinity;
    const placed = paginator.next(height);
    const fragments = fromPage(placed);

    const index = pageNumber - 1;
    const nodes = instantiate(props(pageNumber), fragments);

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

// A totals round is only needed when something can read totalPages: any
// render prop in the tree, or a layout component's params — layouts may
// read them without leaving any render prop behind.
const needsTotalsRound = (root: SafeDocumentNode) =>
  root.children.some(
    (page) =>
      hasDynamic(page as unknown as SafeNode) || (page.props as any)?.layout,
  );

/**
 * Splits every page into output pages: content keeps its first-pass
 * measurements, the engine packs it into each page's flow region, and each
 * output page renders its layout around the fragments that landed on it.
 * Runs a second round when something reads totalPages.
 *
 * @param root - Document node
 * @param fontStore - Font store
 * @returns Document with paginated pages
 */
const resolvePagination = (
  root: SafeDocumentNode,
  fontStore: FontStore,
): SafeDocumentNode => {
  const ctx1 = { totals: null, fontStore, yoga: root.yoga };
  const round1 = paginateDocument(root, ctx1);

  if (!needsTotalsRound(root)) return round1.root;

  const totals: Totals = {
    totalPages: round1.root.children.length,
    subTotals: round1.subTotals,
  };

  const ctx2 = { ...ctx1, totals };
  return paginateDocument(root, ctx2).root;
};

export default resolvePagination;
