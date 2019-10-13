import * as R from 'ramda';

import resolveStyles from './resolveStyles';
import sholdBreak from '../node/shouldBreak';
import resolvePageSizes from './resolvePageSizes';
import getContentArea from '../page/getContentArea';
import resolveInheritance from './resolveInheritance';
import resolveNoteChildren from './resolveNoteChildren';
import resolvePercentRadius from './resolvePercentRadius';
import resolvePercentHeight from './resolvePercentHeight';
import { resolvePageDimensions } from './resolveDimensions';
import resolveLinkSubstitution from './resolveLinkSubstitution';

const assocChildren = R.assoc('children');

const getTop = R.pathOr(0, ['box', 'top']);

const getHeight = R.path(['box', 'height']);

const getChildren = R.propOr([], 'children');

const isElementOutside = R.useWith(R.lte, [R.identity, getTop]);

const splitNode = (height, node, futureNodes = []) => {
  if (!node) return [null, null];

  const nodeTop = getTop(node);
  const nodeHeight = getHeight(node);
  const isOutside = isElementOutside(height, node);
  const shouldSplit = height < nodeTop + nodeHeight;
  const shouldBreak = sholdBreak(node, futureNodes, height);

  if (isOutside || shouldBreak) {
    const next = R.evolve({ box: { top: R.subtract(R.__, height) } })(node);
    return [null, next];
  }

  if (shouldSplit) {
    const [currentChilds, nextChildren] = splitChildren(height, node);

    const current = R.evolve({
      children: R.always(currentChilds),
      box: {
        height: R.when(R.always(shouldSplit), R.always(height - nodeTop)),
      },
    })(node);

    const next = R.evolve({
      children: R.always(nextChildren),
      box: {
        top: R.always(0),
        height: R.subtract(R.__, height - nodeTop),
      },
    })(node);

    return [current, next];
  }

  return [node, null];
};

const splitNodes = (height, nodes) => {
  const currentChildren = [];
  const nextChildren = [];

  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i];
    const futureNodes = nodes.slice(i);
    const [currentChild, nextChild] = splitNode(height, child, futureNodes);

    if (currentChild) currentChildren.push(currentChild);
    if (nextChild) nextChildren.push(nextChild);
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

const splitPage = page => {
  const contentArea = getContentArea(page);
  const height = R.path(['style', 'height'], page);
  const [currentChilds, nextChilds] = splitNodes(contentArea, page.children);

  const currentPage = R.o(
    assocChildren(currentChilds),
    R.assocPath(['box', 'height'], height),
  )(page);

  if (R.isEmpty(nextChilds)) return [currentPage, null];

  const nextPage = R.o(relayoutPage, assocChildren(nextChilds))(page);

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
