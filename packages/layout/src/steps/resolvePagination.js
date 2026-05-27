/* eslint-disable prefer-destructuring */

import * as R from 'ramda';

import chooseFootnotes from '../footnotes/chooseFootnotes';
import getFootnotePlaceholder from '../footnotes/getFootnotePlaceholder';
import getFootnotes from '../footnotes/getFootnotes';
import mapFootnotesToView from '../footnotes/mapFootnotesToView';
import createInstance from '../node/createInstance';
import isFixed from '../node/isFixed';
import splitNodes from '../node/splitNodes';
import getContentArea from '../page/getContentArea';
import getWrapArea from '../page/getWrapArea';
import { resolvePageDimensions } from './resolveDimensions';
import resolveInheritance from './resolveInheritance';
import resolveTextLayout from './resolveTextLayout';
import resolveWrapOffKeepBreaks from './resolveWrapOffKeepBreaks';

const assingChildren = R.assoc('children');

const getHeight = R.path(['box', 'height']);

/* All the children are fixed */
const isAllChildrenFixed = n => R.all(isFixed)(n.children);

/* Node itself is fixed OR has only fixed children */
const isNodeOrAllChildrenFixed = R.anyPass([isFixed, isAllChildrenFixed]);

const isAllFixed = R.all(isNodeOrAllChildrenFixed);

const isDynamic = R.hasPath(['props', 'render']);

const isFootnoteView = R.hasPath(['props', 'renderFootnotes']);

const compose = (...fns) => (value, ...args) => {
  let result = value;
  const reversedFns = R.reverse(fns);

  for (let i = 0; i < reversedFns.length; i += 1) {
    const fn = reversedFns[i];
    result = fn(result, ...args);
  }

  return result;
};

const relayoutPage = compose(
  resolveTextLayout,
  resolveInheritance,
  resolvePageDimensions,
);

const shouldResolveDynamicNodes = node => {
  const children = node.children || [];
  return (
    isDynamic(node) ||
    isFootnoteView(node) ||
    children.some(shouldResolveDynamicNodes)
  );
};

const resolveDynamicNodes = (props, node) => {
  const isNodeDynamic = isDynamic(node) || isFootnoteView(node);

  // Call render prop on dynamic nodes and append result to children
  const resolveChildren = (children = []) => {
    if (isNodeDynamic) {
      if (node.props.render) {
        const res = node.props.render(props);
        return [createInstance(res)].filter(Boolean);
      }

      // render footnotes only if they are passed;
      if (node.props.renderFootnotes && props.footnotesView) {
        return [props.footnotesView].filter(Boolean);
      }

      // if null is passed as the footnoteView; clear contents
      if (node.props.renderFootnotes && props.footnotesView === null) {
        return [];
      }
    }

    return children.map(c => resolveDynamicNodes(props, c));
  };

  // We reset dynamic node box so it can be computed again later on
  const resolveBox = box => {
    return isNodeDynamic ? { ...box, height: 0 } : box;
  };

  return R.evolve(
    {
      box: resolveBox,
      children: resolveChildren,
      lines: prev => (isNodeDynamic ? null : prev),
    },
    node,
  );
};

const resolveDynamicPage = (props, page, fontStore) => {
  if (shouldResolveDynamicNodes(page)) {
    const resolvedPage = resolveDynamicNodes(props, page);
    return relayoutPage(resolvedPage, fontStore);
  }

  return page;
};

const splitPage = (page, pageNumber, fontStore) => {
  const wrapArea = getWrapArea(page);
  const contentArea = getContentArea(page);
  const height = R.path(['style', 'height'], page);
  const width = R.path(['style', 'width'], page);

  const dynamicPage = resolveDynamicPage(
    { pageNumber, footnotesView: null },
    page,
    fontStore,
  );
  const wrappedKeepPage = resolveWrapOffKeepBreaks(dynamicPage, fontStore);

  const relayout = node => relayoutPage(node, fontStore);
  const resolvePageWithFootnotes = footnotes =>
    resolveDynamicPage(
      {
        pageNumber,
        footnotesView: mapFootnotesToView(footnotes, width),
      },
      page,
      fontStore,
    );

  let [currentChildren, nextChildren] = splitNodes(
    wrapArea,
    contentArea,
    wrappedKeepPage.children,
  );

  const pageFootnotes = getFootnotes({ children: currentChildren });

  let resolvedPage = resolvePageWithFootnotes(pageFootnotes);
  resolvedPage = resolveWrapOffKeepBreaks(resolvedPage, fontStore);
  let footnotesPlaceholder = getFootnotePlaceholder(resolvedPage);
  const chosenFootnotes = chooseFootnotes(resolvedPage, pageFootnotes);

  if (chosenFootnotes.footnotes.length > 0 && footnotesPlaceholder) {
    resolvedPage = resolvePageWithFootnotes(chosenFootnotes.footnotes);
    resolvedPage = resolveWrapOffKeepBreaks(resolvedPage, fontStore);
    footnotesPlaceholder = getFootnotePlaceholder(resolvedPage);

    const spacing =
      getHeight(footnotesPlaceholder) + chosenFootnotes.spacingNeeded;

    if (footnotesPlaceholder) {
      [currentChildren, nextChildren] = splitNodes(
        wrapArea - spacing,
        contentArea - spacing,
        resolvedPage.children,
      );

      footnotesPlaceholder.style.marginTop = chosenFootnotes.spacingNeeded;

      if (R.isEmpty(nextChildren) || isAllFixed(nextChildren)) {
        const contentHeight = getHeight(page);
        const pageHeight = page.style.height;
        const footnotesHeight = getHeight(footnotesPlaceholder);

        const lastPageSpacing = pageHeight - contentHeight - footnotesHeight;

        footnotesPlaceholder.style.marginTop = lastPageSpacing;
      }
    }
  } else {
    const updatedWrapArea = wrapArea - chosenFootnotes.spacingNeeded;

    [currentChildren, nextChildren] = splitNodes(
      updatedWrapArea,
      contentArea - chosenFootnotes.spacingNeeded,
      wrappedKeepPage.children,
    );
  }

  const currentPage = R.compose(
    relayout,
    assingChildren(currentChildren),
    R.assocPath(['box', 'height'], height),
  )(page);

  if (R.isEmpty(nextChildren) || isAllFixed(nextChildren))
    return [currentPage, null];

  const nextPage = R.compose(
    relayout,
    assingChildren(nextChildren),
    R.dissocPath(['box', 'height']),
  )(page);

  return [currentPage, nextPage];
};

const resolvePageIndices = (fontStore, pageNumberOffset) => (
  page,
  pageIndex,
  pages,
) => {
  const totalPages = pages.length + pageNumberOffset;

  const props = {
    totalPages,
    pageNumber: pageIndex + pageNumberOffset + 1,
    subPageNumber: page.subPageNumber + 1,
    subPageTotalPages: page.subPageTotalPages,
  };

  return resolveDynamicPage(props, page, fontStore);
};

/**
 * Applies the dynamic inside/outside margins based on page parity.
 * Before this process, marginInside is applied to left side, and marginOutside is applied to right side
 * This process swaps the values for odd page indexes (hence even page numbers)
 * @param {Object} page Page
 * @param {number} pageIndex Page index
 */
const applyInsideOutsideMargins = pageNumberOffset => (page, pageIndex) => {
  if ((pageIndex + pageNumberOffset) % 2 === 0) {
    return page;
  }

  const shiftNodeHorizontally = (node, shiftX) => {
    // if the node has no box (hence no positioning), return the original
    if (!node.box) {
      return node;
    }

    // if the node has specified a marginInside / a marginOutside, add it
    let additionalShiftX = 0;
    if (node.style) {
      if (node.style.marginInside) {
        additionalShiftX -= node.style.marginInside;
      }

      if (node.style.marginOutside) {
        additionalShiftX += node.style.marginOutside;
      }
    }

    const effectiveShiftX = shiftX + additionalShiftX;
    const shiftedNode = {
      ...node,
      box: {
        ...node.box,
        left: node.box.left + effectiveShiftX,
        right: node.box.right - effectiveShiftX,
        marginLeft: node.box.marginLeft + effectiveShiftX,
        marginRight: node.box.marginRight - effectiveShiftX,
      },
    };

    if (node.children) {
      shiftedNode.children = node.children.map(child =>
        shiftNodeHorizontally(child, 0),
      );
    }

    return shiftedNode;
  };

  return {
    ...page,
    children: (page.children || []).map(child =>
      shiftNodeHorizontally(child, 0),
    ),
  };
};

const assocSubPageData = subpages => {
  return subpages.map((page, i) => ({
    ...page,
    subPageNumber: i,
    subPageTotalPages: subpages.length,
  }));
};

const dissocSubPageData = page => {
  return R.compose(
    R.dissoc('subPageNumber'),
    R.dissoc('subPageTotalPages'),
  )(page);
};

const paginate = (page, pageNumber, fontStore) => {
  if (!page) return [];

  let splittedPage = splitPage(page, pageNumber, fontStore);

  const pages = [splittedPage[0]];
  let nextPage = splittedPage[1];

  while (nextPage !== null) {
    splittedPage = splitPage(nextPage, pageNumber + pages.length, fontStore);

    pages.push(splittedPage[0]);
    nextPage = splittedPage[1];
  }

  return pages;
};

/**
 * Performs pagination. This is the step responsible of breaking the whole document
 * into pages following pagiation rules, such as `fixed`, `break` and dynamic nodes.
 *
 * @param {Object} node
 * @param {Object} fontStore font store
 * @returns {Object} layout node
 */
const resolvePagination = (doc, fontStore) => {
  const pageNumberOffset = doc.props?.pageNumberOffset || 0;
  let pages = [];
  let pageNumber = 1 + pageNumberOffset;

  for (let i = 0; i < doc.children.length; i += 1) {
    const page = doc.children[i];
    let subpages = paginate(page, pageNumber, fontStore);

    subpages = assocSubPageData(subpages);
    pageNumber += subpages.length;
    pages = pages.concat(subpages);
  }

  pages = pages.map(
    R.compose(
      dissocSubPageData,
      resolvePageIndices(fontStore, pageNumberOffset),
    ),
  );

  pages = pages.map(applyInsideOutsideMargins(pageNumberOffset));

  return assingChildren(pages, doc);
};

export default resolvePagination;
