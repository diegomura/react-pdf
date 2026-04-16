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
    if (!('fixed' in node.props)) {
      const end = node.box.top + node.box.height;
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

const splitNodes = (height: number, contentArea: number, nodes: SafeNode[]) => {
  const currentChildren: SafeNode[] = [];
  const nextChildren: SafeNode[] = [];
  const suffixFurthestEnd = computeSuffixFurthestEnd(nodes);
  const fixedIndices = collectFixedIndices(nodes);

  const pushFutureFixed = (target: SafeNode[], afterIndex: number) => {
    for (const idx of fixedIndices) {
      if (idx > afterIndex) target.push(nodes[idx]);
    }
  };

  let hasNonFixedPrevious = false;

  const length = nodes.length;
  for (let i = 0; i < length; i += 1) {
    const child = nodes[i];

    if (isFixed(child)) {
      nextChildren.push(child);
      currentChildren.push(child);
      continue;
    }

    const nodeTop = getTop(child);
    const isOutside = height <= nodeTop;
    if (isOutside) {
      const box = Object.assign({}, child.box, { top: child.box.top - height });
      const next = Object.assign({}, child, { box });
      nextChildren.push(next);
      continue;
    }

    const nodeHeight = child.box.height;
    const fitsInsidePage = nodeHeight <= contentArea;
    if (!fitsInsidePage && !canNodeWrap(child)) {
      currentChildren.push(child);
      nextChildren.push(...nodes.slice(i + 1));
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
      const box = Object.assign({}, child.box, { top: child.box.top - height });
      const props = Object.assign({}, child.props, {
        wrap: true,
        break: false,
      });
      const next = Object.assign({}, child, { box, props });

      pushFutureFixed(currentChildren, i);
      nextChildren.push(next, ...nodes.slice(i + 1));
      break;
    }

    const shouldSplit = height + SAFETY_THRESHOLD < nodeTop + nodeHeight;
    if (shouldSplit) {
      const [currentChild, nextChild] = split(child, height, contentArea);

      if (child.children.length > 0 && currentChild.children.length === 0) {
        if (currentChildren.length === 0) {
          currentChildren.push(child);
          pushFutureFixed(currentChildren, i);
          nextChildren.push(...nodes.slice(i + 1));
        } else {
          const box = Object.assign({}, child.box, {
            top: child.box.top - height,
          });
          const next = Object.assign({}, child, { box });

          pushFutureFixed(currentChildren, i);
          nextChildren.push(next, ...nodes.slice(i + 1));
        }
        break;
      }

      if (currentChild) currentChildren.push(currentChild);
      if (nextChild) nextChildren.push(nextChild);

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
  return splitNodes(availableHeight, contentArea, children);
};

const splitView = (node: SafeNode, height: number, contentArea: number) => {
  const [currentNode, nextNode] = splitNode(node, height);
  const [currentChilds, nextChildren] = splitChildren(
    height,
    contentArea,
    node,
  );

  return [
    assingChildren(currentChilds, currentNode),
    assingChildren(nextChildren, nextNode),
  ];
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
