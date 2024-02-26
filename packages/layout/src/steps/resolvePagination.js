/* eslint-disable no-use-before-define */
/* eslint-disable no-continue */
/* eslint-disable prefer-destructuring */

import * as P from '@react-pdf/primitives';
import { isNil, omit, asyncCompose } from '@react-pdf/fns';

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
import resolveAssets from './resolveAssets';

const isText = (node) => node.type === P.Text;

// Prevent splitting elements by low decimal numbers
const SAFETY_THRESHOLD = 0.001;

const assingChildren = (children, node) =>
  Object.assign({}, node, { children });

const getTop = (node) => node.box?.top || 0;

const allFixed = (nodes) => nodes.every(isFixed);

const isDynamic = (node) => !isNil(node.props?.render);

const relayoutPage = asyncCompose(
  resolveAssets,
  resolveTextLayout,
  resolvePageDimensions,
  resolveInheritance,
  resolvePageStyles,
);

const warnUnavailableSpace = (node) => {
  console.warn(
    `Node of type ${node.type} can't wrap between pages and it's bigger than available page height`,
  );
};

const splitNodes = (height, contentArea, nodes) => {
  const currentChildren = [];
  const nextChildren = [];

  for (let i = 0; i < nodes.length; i += 1) {
    const child = nodes[i];
    const futureNodes = nodes.slice(i + 1);
    const futureFixedNodes = futureNodes.filter(isFixed);

    const nodeTop = getTop(child);
    const nodeHeight = child.box.height;
    const isOutside = height <= nodeTop;
    const shouldBreak = shouldNodeBreak(child, futureNodes, height);
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
        const box = Object.assign({}, child.box, {
          top: child.box.top - height,
        });
        const next = Object.assign({}, child, { box });

        currentChildren.push(...futureFixedNodes);
        nextChildren.push(next, ...futureNodes);
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

const splitChildren = (height, contentArea, node) => {
  const children = node.children || [];
  const availableHeight = height - getTop(node);
  return splitNodes(availableHeight, contentArea, children);
};

const splitView = (node, height, contentArea) => {
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

const split = (node, height, contentArea) =>
  isText(node) ? splitText(node, height) : splitView(node, height, contentArea);

const shouldResolveDynamicNodes = (node) => {
  const children = node.children || [];
  return isDynamic(node) || children.some(shouldResolveDynamicNodes);
};

const resolveDynamicNodes = (props, node) => {
  const isNodeDynamic = isDynamic(node);

  // Call render prop on dynamic nodes and append result to children
  const resolveChildren = (children = []) => {
    if (isNodeDynamic) {
      const res = node.props.render(props);
      return createInstances(res)
        .filter(Boolean)
        .map((n) => resolveDynamicNodes(props, n));
    }

    return children.map((c) => resolveDynamicNodes(props, c));
  };

  // We reset dynamic text box so it can be computed again later on
  const resetHeight = isNodeDynamic && isText(node);
  const box = resetHeight ? { ...node.box, height: 0 } : node.box;

  const children = resolveChildren(node.children);
  const lines = isNodeDynamic ? null : node.lines;

  return Object.assign({}, node, { box, lines, children });
};

const resolveDynamicPage = async (props, page, fontStore, yoga) => {
  if (shouldResolveDynamicNodes(page)) {
    const resolvedPage = resolveDynamicNodes(props, page);
    const relayoutedPage = await relayoutPage(resolvedPage, fontStore, yoga);
    return relayoutedPage;
  }

  return page;
};

const splitPage = async (page, pageNumber, fontStore, yoga) => {
  const wrapArea = getWrapArea(page);
  const contentArea = getContentArea(page);
  const dynamicPage = await resolveDynamicPage({ pageNumber }, page, fontStore, yoga);
  const height = page.style.height;

  const [currentChilds, nextChilds] = splitNodes(
    wrapArea,
    contentArea,
    dynamicPage.children,
  );

  const relayout = async node => relayoutPage(node, fontStore, yoga);

  const currentBox = { ...page.box, height };
  const currentPage = await relayout(
    Object.assign({}, page, { box: currentBox, children: currentChilds }),
  );

  if (nextChilds.length === 0 || allFixed(nextChilds))
    return [currentPage, null];

  const nextBox = omit('height', page.box);
  const nextProps = omit('bookmark', page.props);

  const nextPage = await relayout(
    Object.assign({}, page, {
      props: nextProps,
      box: nextBox,
      children: nextChilds,
    }),
  );

  return [currentPage, nextPage];
};

const resolvePageIndices = async (fontStore, yoga, page, pageNumber, pages) => {
  const totalPages = pages.length;

  const props = {
    totalPages,
    pageNumber: pageNumber + 1,
    subPageNumber: page.subPageNumber + 1,
    subPageTotalPages: page.subPageTotalPages,
  };

  return resolveDynamicPage(props, page, fontStore, yoga);
};

const assocSubPageData = (subpages, pageIndex) => {
  return subpages.map((page, i) => ({
    ...page,
    pageIndex,
    subPageNumber: i,
    subPageTotalPages: subpages.length,
  }));
};

const dissocSubPageData = page => {
  return omit(['pageIndex', 'subPageNumber', 'subPageTotalPages'], page);
};

const paginate = async (page, pageNumber, fontStore, yoga) => {
  if (!page) return [];

  if (page.props?.wrap === false) return [page];

  let splittedPage = await splitPage(page, pageNumber, fontStore, yoga);

  const pages = [splittedPage[0]];
  let nextPage = splittedPage[1];

  while (nextPage !== null) {
    splittedPage = await splitPage(
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
 * Performs pagination. This is the step responsible for breaking the whole document
 * into pages following pagination rules, such as `fixed`, `break` and dynamic nodes.
 *
 * @param {Object} doc node
 * @param {Object} fontStore font store
 * @returns {Object} layout node
 */
const resolvePagination = async (doc, fontStore) => {
  let pages = [];
  let pageNumber = 1;

  await Promise.all(
    doc.children.map(async (page, pageIndex) => {
      let subpages = await paginate(page, pageNumber, fontStore, doc.yoga);

      subpages = assocSubPageData(subpages, pageIndex);
      pageNumber += subpages.length;
      pages.push(...subpages);
    }),
  );

  // because the subpages are pushed into the array according to the speed they are paginated,
  // we sort them by their initial index, while keeping the subpages order.
  pages.sort((a, b) => {
    if (a.pageIndex !== b.pageIndex) {
      return a.pageIndex - b.pageIndex;
    }
    return a.subPageNumber - b.subPageNumber;
  });

  pages = await Promise.all(
    pages.map(async (...args) =>
      dissocSubPageData(await resolvePageIndices(fontStore, doc.yoga, ...args)),
    ),
  );

  return assingChildren(pages, doc);
};

export default resolvePagination;
