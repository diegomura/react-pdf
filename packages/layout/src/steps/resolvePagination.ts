import * as P from '@react-pdf/primitives';
import { compose, omit } from '@react-pdf/fns';
import FontStore from '@react-pdf/font';

import isFixed from '../node/isFixed';
import splitText from '../text/splitText';
import splitNode from '../node/splitNode';
import canNodeWrap from '../node/getWrap';
import getWrapArea from '../page/getWrapArea';
import getContentArea from '../page/getContentArea';
import createInstances from '../node/createInstances';
import { shouldBreakOptimized } from '../node/shouldBreak';
import resolveTextLayout from './resolveTextLayout';
import resolveInheritance from './resolveInheritance';
import { resolvePageDimensions } from './resolveDimensions';
import { resolvePageStyles } from './resolveStyles';
import {
  DynamicPageProps,
  SafeDocumentNode,
  SafeLinkNode,
  SafeNode,
  SafePageNode,
  SafeTextNode,
  SafeViewNode,
  YogaInstance,
} from '../types';

const isText = (node: SafeNode): node is SafeTextNode => node.type === P.Text;

// Prevent splitting elements by low decimal numbers
const SAFETY_THRESHOLD = 0.001;

const assingChildren = <T>(children: SafeNode[], node: T): T =>
  Object.assign({}, node, { children });

const getTop = (node: SafeNode) => node.box?.top || 0;

const allFixed = (nodes: SafeNode[]) => nodes.every(isFixed);

/**
 * Build suffix-max array: suffixFurthestEnd[i] = max(top + height)
 * of non-fixed-prop nodes at indices > i, or null if none.
 */
const computeSuffixFurthestEnd = (nodes: SafeNode[]): (number | null)[] => {
  const length = nodes.length;
  const result: (number | null)[] = new Array(length);
  let max: number | null = null;

  for (let i = length - 1; i >= 0; i -= 1) {
    result[i] = max;
    const node = nodes[i];
    if (!isFixed(node)) {
      const end = (node.box?.top || 0) + (node.box?.height || 0);
      max = max === null ? end : Math.max(max, end);
    }
  }

  return result;
};

const collectFixedIndices = (nodes: SafeNode[]): number[] => {
  const indices: number[] = [];
  const length = nodes.length;
  for (let i = 0; i < length; i += 1) {
    if (isFixed(nodes[i])) indices.push(i);
  }
  return indices;
};

const isDynamic = (
  node: SafeNode,
): node is SafeLinkNode | SafeTextNode | SafeViewNode =>
  node.props && 'render' in node.props;

const relayoutPage = compose(
  resolveTextLayout,
  resolvePageDimensions,
  resolveInheritance,
  resolvePageStyles,
);

const warnUnavailableSpace = (node: SafeNode) => {
  console.warn(
    `Node of type ${node.type} can't wrap between pages and it's bigger than available page height`,
  );
};

const isAbsolutePositioned = (node: SafeNode) =>
  node.style?.position === 'absolute';

// Sum the vertical space a node would occupy in a flex column: top margin +
// height + bottom margin. Yoga's flex layout positions siblings using this
// (margins do not collapse in flexbox), so we mirror it when synthesizing
// next-page positions without a yoga relayout.
const getOutsetHeight = (node: SafeNode) =>
  (node.box?.marginTop || 0) +
  (node.box?.height || 0) +
  (node.box?.marginBottom || 0);

const splitNodes = (
  height: number,
  contentArea: number,
  nodes: SafeNode[],
  isRowLayout = false,
) => {
  const currentChildren: SafeNode[] = [];
  const nextChildren: SafeNode[] = [];
  const suffixFurthestEnd = computeSuffixFurthestEnd(nodes);
  const fixedIndices = collectFixedIndices(nodes);
  const length = nodes.length;

  const pushFutureFixed = (target: SafeNode[], afterIndex: number) => {
    for (const idx of fixedIndices) {
      if (idx > afterIndex) target.push(nodes[idx]);
    }
  };

  // The next iteration's splitNodes makes decisions from `box.top`/`box.height`.
  // To match what yoga's relayout would have produced (the dropped step), we
  // synthesize page-relative positions: cumFixedHeight is the bottom edge of the
  // last normal-flow fixed sibling, cumNonFixedNextHeight is the bottom edge of
  // the last non-fixed sibling already pushed to nextChildren.
  let cumFixedHeight = 0;
  let cumNonFixedNextHeight = 0;

  // Returns `node` cloned with `box.top` set to its expected position on the
  // next page. Mutates the running cursor — must only be called when pushing to
  // nextChildren, in left-to-right sibling order.
  //
  // In a flex:row container children share the same top (they are side-by-side,
  // not stacked). The cumulative column approach must not be applied there —
  // preserve box.top as-is, since splitNode already resets next-half tops to 0.
  const placeOnNextPage = (node: SafeNode): SafeNode => {
    if (isRowLayout) {
      return Object.assign({}, node, {
        box: Object.assign({}, node.box, { top: node.box?.top || 0 }),
      });
    }
    const marginTop = node.box?.marginTop || 0;
    const newTop = cumFixedHeight + cumNonFixedNextHeight + marginTop;
    cumNonFixedNextHeight += getOutsetHeight(node);
    return Object.assign({}, node, {
      box: Object.assign({}, node.box, { top: newTop }),
    });
  };

  // Keep cumFixedHeight in sync for normal-flow fixed siblings.
  // Use the node's actual bottom edge (box.top + height + marginBottom) rather
  // than just getOutsetHeight (height + margins), because box.top already
  // encodes the parent's paddingTop and any preceding content.  Without this,
  // a page-level fixed header at box.top=44 (paddingTop=44) would only
  // contribute its size (41pt) to cumFixedHeight instead of its bottom (85pt),
  // making the synthesized table.box.top 44pt too low and over-allocating
  // content height per page.
  const advanceFixed = (node: SafeNode) => {
    if (!isRowLayout && !isAbsolutePositioned(node)) {
      const bottom =
        (node.box?.top || 0) +
        (node.box?.height || 0) +
        (node.box?.marginBottom || 0);
      cumFixedHeight = Math.max(cumFixedHeight, bottom);
    }
  };

  const adjustRemaining = (fromIndex: number): SafeNode[] => {
    const result: SafeNode[] = [];
    for (let j = fromIndex; j < length; j += 1) {
      const node = nodes[j];
      if (isFixed(node)) {
        result.push(node);
        advanceFixed(node);
        continue;
      }
      // Absolute-positioned nodes are not part of the flex flow; push as-is
      // so their parent-relative position is preserved on the next page.
      if (isAbsolutePositioned(node)) {
        result.push(node);
        continue;
      }
      result.push(placeOnNextPage(node));
    }
    return result;
  };

  let hasNonFixedPrevious = false;

  for (let i = 0; i < length; i += 1) {
    const child = nodes[i];

    if (isFixed(child)) {
      nextChildren.push(child);
      currentChildren.push(child);
      advanceFixed(child);
      continue;
    }

    const nodeTop = getTop(child);
    const isOutside = height <= nodeTop;
    if (isOutside) {
      nextChildren.push(placeOnNextPage(child));
      continue;
    }

    const nodeHeight = child.box.height;
    const fitsInsidePage = nodeHeight <= contentArea;
    if (!fitsInsidePage && !canNodeWrap(child)) {
      currentChildren.push(child);
      nextChildren.push(...adjustRemaining(i + 1));
      warnUnavailableSpace(child);
      break;
    }

    const shouldBreak = shouldBreakOptimized(
      child,
      suffixFurthestEnd[i],
      height,
      hasNonFixedPrevious,
    );
    if (shouldBreak) {
      const props = Object.assign({}, child.props, {
        wrap: true,
        break: false,
      });
      const placed = placeOnNextPage(child);
      const next = Object.assign({}, placed, { props });

      pushFutureFixed(currentChildren, i);
      nextChildren.push(next, ...adjustRemaining(i + 1));
      break;
    }

    const shouldSplit = height + SAFETY_THRESHOLD < nodeTop + nodeHeight;
    if (shouldSplit) {
      const [currentChild, nextChild] = split(child, height, contentArea);

      if (child.children.length > 0 && currentChild.children.length === 0) {
        if (currentChildren.length === 0) {
          currentChildren.push(child);
          pushFutureFixed(currentChildren, i);
          nextChildren.push(...adjustRemaining(i + 1));
        } else {
          pushFutureFixed(currentChildren, i);
          nextChildren.push(placeOnNextPage(child), ...adjustRemaining(i + 1));
        }
        break;
      }

      if (currentChild) currentChildren.push(currentChild);
      if (nextChild) nextChildren.push(placeOnNextPage(nextChild));

      hasNonFixedPrevious = true;
      continue;
    }

    currentChildren.push(child);
    hasNonFixedPrevious = true;
  }

  return [currentChildren, nextChildren];
};

const splitChildren = (height: number, contentArea: number, node: SafeNode) => {
  const children = node.children || [];
  const availableHeight = height - getTop(node);
  const fd = (node.style as { flexDirection?: string } | undefined)
    ?.flexDirection;
  const isRowLayout = fd === 'row' || fd === 'row-reverse';
  return splitNodes(availableHeight, contentArea, children, isRowLayout);
};

// Compute the height that yoga would assign to `node`'s next-page half given
// the already-computed nextChildren.  For auto-height nodes, splitNode derives
// nextBoxHeight geometrically (original.h − splitPoint) which can diverge from
// the real content height when text lines don't align with the split boundary.
//
// This function:
//   • For flex:column: sums outset heights (margin + height + margin) of flow
//     children — equivalent to yoga's stacking computation.
//   • For flex:row: takes max of flow children heights — mirrors alignItems:stretch —
//     and propagates that stretched height back to EVERY direct flow child so
//     the next splitNodes iteration sees consistent heights for shouldSplit checks.
//
// Returns { actualH, updatedChildren } where updatedChildren has the stretched
// heights applied to direct row children (grandchildren are left unchanged so
// their own content-height checks remain accurate).
const computeActualNextDimensions = (
  nextChildren: SafeNode[],
  parent: SafeNode,
): { actualH: number; updatedChildren: SafeNode[] } => {
  // Use style-based padding: splitNode zeroes paddingTop in style for the
  // next-half, so parent.style.paddingTop reflects the real rendered value (0).
  // box.paddingTop retains the pre-split original, which would over-count.
  const ptRaw = parent.style?.paddingTop;
  const pbRaw = parent.style?.paddingBottom;
  const pt = typeof ptRaw === 'number' ? ptRaw : 0;
  const pb = typeof pbRaw === 'number' ? pbRaw : 0;
  const flow = nextChildren.filter(
    (c) => !isFixed(c) && !isAbsolutePositioned(c),
  );
  const fd = (parent.style as { flexDirection?: string } | undefined)
    ?.flexDirection;
  const isRow = fd === 'row' || fd === 'row-reverse';

  if (!flow.length) {
    // No flow content — actual height is padding only (e.g. empty stretched col).
    return { actualH: pt + pb, updatedChildren: nextChildren };
  }

  if (isRow) {
    // alignItems:stretch: each column's rendered height = max of all columns.
    const maxH = Math.max(...flow.map((c) => c.box?.height || 0));
    const actualH = pt + maxH + pb;
    // Propagate stretched height to direct children so subsequent splitNodes
    // calls use the correct height for shouldSplit decisions at this level.
    const updatedChildren = nextChildren.map((c) => {
      if (isFixed(c) || isAbsolutePositioned(c)) return c;
      const h = c.box?.height || 0;
      if (h === maxH) return c;
      return Object.assign({}, c, {
        box: Object.assign({}, c.box, { height: maxH }),
      });
    });
    return { actualH, updatedChildren };
  }

  // flex:column (default): sum outset heights of flow children.
  const actualH = pt + flow.reduce((s, c) => s + getOutsetHeight(c), 0) + pb;
  return { actualH, updatedChildren: nextChildren };
};

const splitView = (node: SafeNode, height: number, contentArea: number) => {
  const [currentNode, nextNode] = splitNode(node, height);
  const [currentChilds, nextChildren] = splitChildren(
    height,
    contentArea,
    node,
  );

  const current = assingChildren(currentChilds, currentNode);

  if (!nextNode) return [current, null];

  // For auto-height nodes, replace splitNode's geometric nextBoxHeight with
  // the real content height and apply flex:row stretch to direct children.
  if (node.style?.height == null) {
    const { actualH, updatedChildren } = computeActualNextDimensions(
      nextChildren,
      nextNode, // next-half: style.paddingTop=0, style.paddingBottom=original
    );
    const next = assingChildren(
      updatedChildren,
      Object.assign({}, nextNode, {
        box: Object.assign({}, nextNode.box, { height: actualH }),
      }),
    );
    return [current, next];
  }

  return [current, assingChildren(nextChildren, nextNode)];
};

const split = (node: SafeNode, height: number, contentArea: number) =>
  isText(node) ? splitText(node, height) : splitView(node, height, contentArea);

const shouldResolveDynamicNodes = (node: SafeNode) => {
  const children = node.children || [];
  return isDynamic(node) || children.some(shouldResolveDynamicNodes);
};

const resolveDynamicNodes = (props: DynamicPageProps, node: SafeNode) => {
  const isNodeDynamic = isDynamic(node);

  // Call render prop on dynamic nodes and append result to children
  const resolveChildren = (children = []) => {
    if (isNodeDynamic) {
      const res = node.props.render(props);
      return (
        createInstances(res)
          .filter(Boolean)
          // @ts-expect-error rework dynamic nodes. conflicting types
          .map((n) => resolveDynamicNodes(props, n))
      );
    }

    return children.map((c) => resolveDynamicNodes(props, c));
  };

  // We reset dynamic text box so it can be computed again later on
  const resetHeight = isNodeDynamic && isText(node);
  const box = resetHeight ? { ...node.box, height: 0 } : node.box;

  const children = resolveChildren(node.children);

  // @ts-expect-error handle text here specifically
  const lines = isNodeDynamic ? null : node.lines;

  return Object.assign({}, node, { box, lines, children });
};

const resolveDynamicPage = (
  props: DynamicPageProps,
  page: SafePageNode,
  fontStore: FontStore,
  yoga: YogaInstance,
) => {
  if (shouldResolveDynamicNodes(page)) {
    const resolvedPage = resolveDynamicNodes(props, page);
    return relayoutPage(resolvedPage, fontStore, yoga);
  }

  return page;
};

const splitPage = (
  page: SafePageNode,
  pageNumber: number,
  fontStore: FontStore,
  yoga: YogaInstance,
): SafePageNode[] => {
  const wrapArea = getWrapArea(page);
  const contentArea = getContentArea(page);
  const dynamicPage = resolveDynamicPage({ pageNumber }, page, fontStore, yoga);
  const height = page.style.height;

  const [currentChilds, nextChilds] = splitNodes(
    wrapArea,
    contentArea,
    dynamicPage.children,
  );

  const relayout = (node: SafePageNode): SafePageNode =>
    // @ts-expect-error rework pagination
    relayoutPage(node, fontStore, yoga) as SafePageNode;

  const currentBox = { ...page.box, height };
  const currentPage = relayout(
    Object.assign({}, page, { box: currentBox, children: currentChilds }),
  );

  if (nextChilds.length === 0 || allFixed(nextChilds))
    return [currentPage, null];

  const nextBox = omit('height', page.box);
  const nextProps = omit('bookmark', page.props);

  // Skip relayout for nextPage: it's only used as input to the next splitPage call,
  // never added to final output. Children already have correct box values
  // (splitNodes adjusts box.top, split() computes dimensions for split nodes).
  // The currentPage from the next iteration will be properly relayed out.
  const nextPage = Object.assign({}, page, {
    props: nextProps,
    box: nextBox,
    children: nextChilds,
  }) as SafePageNode;

  return [currentPage, nextPage];
};

const resolvePageIndices = (fontStore, yoga, page, pageNumber, pages) => {
  const totalPages = pages.length;

  const props = {
    totalPages,
    pageNumber: pageNumber + 1,
    subPageNumber: page.subPageNumber + 1,
    subPageTotalPages: page.subPageTotalPages,
  };

  return resolveDynamicPage(props, page, fontStore, yoga);
};

const assocSubPageData = (subpages) => {
  return subpages.map((page, i) => ({
    ...page,
    subPageNumber: i,
    subPageTotalPages: subpages.length,
  }));
};

const dissocSubPageData = (page) => {
  return omit(['subPageNumber', 'subPageTotalPages'], page);
};

const paginate = (
  page: SafePageNode,
  pageNumber: number,
  fontStore: FontStore,
  yoga: YogaInstance,
) => {
  if (!page) return [];

  if (page.props?.wrap === false) return [page];

  let splittedPage = splitPage(page, pageNumber, fontStore, yoga);

  const pages = [splittedPage[0]];
  let nextPage = splittedPage[1];

  while (nextPage !== null) {
    splittedPage = splitPage(
      nextPage,
      pageNumber + pages.length,
      fontStore,
      yoga,
    );

    pages.push(splittedPage[0]);
    nextPage = splittedPage[1];
  }

  return pages;
};

/**
 * Performs pagination. This is the step responsible of breaking the whole document
 * into pages following pagiation rules, such as `fixed`, `break` and dynamic nodes.
 *
 * @param root - Document node
 * @param fontStore - Font store
 * @returns Layout node
 */
const resolvePagination = (
  root: SafeDocumentNode,
  fontStore: FontStore,
): SafeDocumentNode => {
  let pages = [];
  let pageNumber = 1;

  for (let i = 0; i < root.children.length; i += 1) {
    const page = root.children[i];
    let subpages = paginate(page, pageNumber, fontStore, root.yoga);

    subpages = assocSubPageData(subpages);
    pageNumber += subpages.length;
    pages = pages.concat(subpages);
  }

  pages = pages.map((...args) =>
    dissocSubPageData(resolvePageIndices(fontStore, root.yoga, ...args)),
  );

  return assingChildren(pages, root);
};

export default resolvePagination;
