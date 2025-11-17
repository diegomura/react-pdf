import * as P from '@react-pdf/primitives';
import { omit, compose } from '@react-pdf/fns';
import FontStore from '@react-pdf/font';

import isFixed from '../node/isFixed';
import splitText from '../text/splitText';
import splitNode from '../node/splitNode';
import canNodeWrap from '../node/getWrap';
import getWrapArea from '../page/getWrapArea';
import getContentArea from '../page/getContentArea';
import createInstances from '../node/createInstances';
import shouldNodeBreak from '../node/shouldBreak';
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

  for (let i = 0; i < nodes.length; i += 1) {
    const child = nodes[i];
    const futureNodes = nodes.slice(i + 1);
    const futureFixedNodes = futureNodes.filter(isFixed);

    const nodeTop = getTop(child);
    const nodeHeight = child.box.height;
    const isOutside = height <= nodeTop;
    const shouldBreak = shouldNodeBreak(
      child,
      futureNodes,
      height,
      currentChildren,
    );
    const shouldSplit = height + SAFETY_THRESHOLD < nodeTop + nodeHeight;
    const canWrap = canNodeWrap(child);
    const fitsInsidePage = nodeHeight <= contentArea;

    if (isFixed(child)) {
      nextChildren.push(child);
      currentChildren.push(child);
      continue;
    }

    if (isOutside) {
      const box = Object.assign({}, child.box, { top: child.box.top - height });
      const next = Object.assign({}, child, { box });
      nextChildren.push(next);
      continue;
    }

    if (!fitsInsidePage && !canWrap) {
      currentChildren.push(child);
      nextChildren.push(...futureNodes);
      warnUnavailableSpace(child);
      break;
    }

    if (shouldBreak) {
      const box = Object.assign({}, child.box, { top: child.box.top - height });
      const props = Object.assign({}, child.props, {
        wrap: true,
        break: false,
      });
      const next = Object.assign({}, child, { box, props });

      currentChildren.push(...futureFixedNodes);
      nextChildren.push(next, ...futureNodes);
      break;
    }

    if (shouldSplit) {
      const [currentChild, nextChild] = split(child, height, contentArea);

      // All children are moved to the next page, it doesn't make sense to show the parent on the current page
      if (child.children.length > 0 && currentChild.children.length === 0) {
        // But if the current page is empty then we can just include the parent on the current page
        if (currentChildren.length === 0) {
          currentChildren.push(child, ...futureFixedNodes);
          nextChildren.push(...futureNodes);
        } else {
          const box = Object.assign({}, child.box, {
            top: child.box.top - height,
          });
          const next = Object.assign({}, child, { box });

          currentChildren.push(...futureFixedNodes);
          nextChildren.push(next, ...futureNodes);
        }
        break;
      }

      if (currentChild) currentChildren.push(currentChild);
      if (nextChild) nextChildren.push(nextChild);

      continue;
    }

    currentChildren.push(child);
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

  const nextPage = relayout(
    Object.assign({}, page, {
      props: nextProps,
      box: nextBox,
      children: nextChilds,
    }),
  );

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

const assocSubPageData = (
  subpages: SafePageNode[],
  originalPage?: SafePageNode,
  startPageNumber?: number,
) => {
  return subpages.map((page, i) => {
    const basePage = {
      ...page,
      subPageNumber: i,
      subPageTotalPages: subpages.length,
    };

    // Apply wrapStyles if provided
    // Always apply wrapStyles (even for single pages) to ensure correct styling
    // based on absolute page number in the document
    if (originalPage?.props?.wrapStyles) {
      // Calculate absolute page number for this subpage
      const absolutePageNumber =
        startPageNumber !== undefined ? startPageNumber + i : i + 1;
      const wrapStyles = originalPage.props.wrapStyles(
        i,
        subpages.length,
        absolutePageNumber,
      );
      if (wrapStyles) {
        // Merge wrapStyles with existing style
        basePage.style = Array.isArray(basePage.style)
          ? ([...basePage.style, wrapStyles] as any)
          : ([basePage.style || {}, wrapStyles] as any);
      }
    }

    return basePage;
  });
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

    subpages = assocSubPageData(subpages, page, pageNumber);
    pageNumber += subpages.length;
    pages = pages.concat(subpages);
  }

  pages = pages.map((...args) =>
    dissocSubPageData(resolvePageIndices(fontStore, root.yoga, ...args)),
  );

  return assingChildren(pages, root);
};

export default resolvePagination;
