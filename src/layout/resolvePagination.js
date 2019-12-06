import * as R from 'ramda';

import isText from '../node/isText';
import resolveStyles from './resolveStyles';
import shouldNodeBreak from '../node/shouldBreak';
import getContentArea from '../page/getContentArea';
import resolveInheritance from './resolveInheritance';
import resolveNoteChildren from './resolveNoteChildren';
import lineIndexAtHeight from '../text/lineIndexAtHeight';
import heightAtLineIndex from '../text/heightAtLineIndex';
import resolvePercentRadius from './resolvePercentRadius';
import resolvePercentHeight from './resolvePercentHeight';
import { resolvePageDimensions } from './resolveDimensions';
import resolveLinkSubstitution from './resolveLinkSubstitution';

const zero = R.always(0);

const assocChildren = R.assoc('children');

const getTop = R.pathOr(0, ['box', 'top']);

const getHeight = R.path(['box', 'height']);

const getChildren = R.propOr([], 'children');

const hasFixedHeight = R.hasPath(['style', 'height']);

const isElementOutside = R.useWith(R.lte, [R.identity, getTop]);

const isFixed = R.pathEq(['props', 'fixed'], true);

const subtractHeight = value =>
  R.o(R.subtract(R.__, value), R.path(['box', 'height']));

const splitView = (node, height) => {
  if (!node) return [null, null];

  const nodeTop = getTop(node);

  const [currentChilds, nextChildren] = splitChildren(height, node);

  // TODO: We should keep style untouched
  const current = R.evolve({
    children: R.always(currentChilds),
    style: R.evolve({
      paddingBottom: zero,
      borderBottomWidth: zero,
      borderBottomLeftRadius: zero,
      borderBottomRightRadius: zero,
    }),
    box: {
      height: R.always(height - nodeTop),
      borderBottomWidth: zero,
    },
  })(node);

  const nextHeight = R.ifElse(
    hasFixedHeight,
    subtractHeight(height - nodeTop),
    R.always(null),
  )(node);

  // TODO: We should keep style untouched
  const next = R.evolve({
    children: R.always(nextChildren),
    style: R.evolve({
      paddingTop: zero,
      borderTopWidth: zero,
      borderTopLeftRadius: zero,
      borderTopRightRadius: zero,
    }),
    box: {
      top: zero,
      height: R.always(nextHeight),
      borderTopWidth: zero,
    },
  })(node);

  return [current, next];
};

const getWidows = R.pathOr(2, ['props', 'widows']);

const getOrphans = R.pathOr(2, ['props', 'orphans']);

const getLineBreak = (node, height) => {
  const top = getTop(node);
  const widows = getWidows(node);
  const orphans = getOrphans(node);
  const linesQuantity = node.lines.length;
  const slicedLine = lineIndexAtHeight(node, height - top);

  if (linesQuantity < orphans) {
    return linesQuantity;
  } else if (slicedLine < orphans || linesQuantity < orphans + widows) {
    return 0;
  } else if (linesQuantity === orphans + widows) {
    return orphans;
  } else if (linesQuantity - slicedLine < widows) {
    return linesQuantity - widows;
  }

  return slicedLine;
};

const splitText = (node, height) => {
  const slicedLineIndex = getLineBreak(node, height);
  const currentHeight = heightAtLineIndex(node, slicedLineIndex);
  const nextHeight = node.box.height - currentHeight;

  const current = R.evolve(
    {
      lines: R.slice(0, slicedLineIndex),
      style: R.evolve({
        marginBottom: zero,
        paddingBottom: zero,
        borderBottomWidth: zero,
        borderBottomLeftRadius: zero,
        borderBottomRightRadius: zero,
      }),
      box: {
        height: R.always(currentHeight),
        borderBottomWidth: zero,
      },
    },
    node,
  );

  const next = R.evolve(
    {
      lines: R.slice(slicedLineIndex, Infinity),
      style: R.evolve({
        marginTop: zero,
        paddingTop: zero,
        borderTopWidth: zero,
        borderTopLeftRadius: zero,
        borderTopRightRadius: zero,
      }),
      box: {
        top: zero,
        height: R.always(nextHeight),
        borderTopWidth: zero,
      },
    },
    node,
  );

  return [current, next];
};

const splitNode = R.ifElse(isText, splitText, splitView);

// Prevent splitting elements by low decimal numbers
const SAFTY_THRESHOLD = 0.001;

const splitNodes = (height, nodes) => {
  const currentChildren = [];
  const nextChildren = [];

  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i];
    const futureNodes = nodes.slice(i + 1);

    const nodeTop = getTop(child);
    const nodeHeight = getHeight(child);
    const isOutside = isElementOutside(height, child);
    const shouldBreak = shouldNodeBreak(child, futureNodes, height);
    const shouldSplit = height + SAFTY_THRESHOLD < nodeTop + nodeHeight;

    if (isFixed(child)) {
      nextChildren.push(child);
      currentChildren.push(child);
      continue;
    }

    if (isOutside) {
      const next = R.evolve({ box: { top: R.subtract(R.__, height) } })(child);
      nextChildren.push(next);
      continue;
    }

    if (shouldBreak) {
      const next = R.evolve({
        box: { top: R.subtract(R.__, height) },
        props: R.evolve({ break: R.always(false) }),
      })(child);

      nextChildren.push(next, ...futureNodes);
      break;
    }

    if (shouldSplit) {
      const [currentChild, nextChild] = splitNode(child, height);

      if (currentChild) currentChildren.push(currentChild);
      if (nextChild) nextChildren.push(nextChild);

      continue;
    }

    currentChildren.push(child);
  }

  return [currentChildren, nextChildren];
};

const splitChildren = (height, node) => {
  const children = getChildren(node);
  const availableHeight = height - getTop(node);
  return splitNodes(availableHeight, children);
};

const relayoutPage = R.compose(
  resolvePercentRadius,
  resolveInheritance,
  resolvePageDimensions,
  resolvePercentHeight,
  resolveStyles,
  resolveNoteChildren,
  resolveLinkSubstitution,
);

const allFixed = R.all(isFixed);

const splitPage = page => {
  const contentArea = getContentArea(page);
  const height = R.path(['style', 'height'], page);
  const [currentChilds, nextChilds] = splitNodes(contentArea, page.children);

  const currentPage = R.compose(
    relayoutPage,
    assocChildren(currentChilds),
    R.assocPath(['box', 'height'], height),
  )(page);

  if (R.isEmpty(nextChilds) || allFixed(nextChilds)) return [currentPage, null];

  const nextPage = R.compose(
    relayoutPage,
    assocChildren(nextChilds),
    R.dissocPath(['box', 'height']),
  )(page);

  return [currentPage, nextPage];
};

const paginate = (pageNumber, page) => {
  if (!page) return [];

  let splittedPage = splitPage(page);

  const pages = [splittedPage[0]];
  let nextPage = splittedPage[1];

  while (nextPage !== null) {
    splittedPage = splitPage(nextPage);

    pages.push(splittedPage[0]);
    nextPage = splittedPage[1];
  }

  return pages;
};

const resolvePagination = doc => {
  let pages = [];
  let pageNumber = 0;

  for (let i = 0; i < doc.children.length; i++) {
    const page = doc.children[i];
    const subpages = paginate(pageNumber, page);

    pageNumber += subpages.length;
    pages = pages.concat(subpages);
  }

  return assocChildren(pages, doc);
};

export default resolvePagination;
