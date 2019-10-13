import * as R from 'ramda';

// import shouldNodeBreak from '../node/shouldBreak';
// import getContentArea from '../page/getContentArea';
import { resolvePageDimensions } from './resolveDimensions';

const getChildren = R.propOr([], 'children');

const resetHeight = R.assocPath(['box', 'height'], null);

const setChildren = children => node =>
  R.compose(
    R.assoc('children', children),
    resetHeight,
  )(node);

const setBreak = R.assocPath(['props', 'break']);

const breakChildren = (node) => {
  const children = getChildren(node);

  let nextElements = [];
  const currentElements = [];

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // const futureElements = children.slice(i + 1);
    const shouldBreak = R.path(['props', 'break'], child);
    // const shouldBreak = shouldNodeBreak(child, futureElements, height);

    if (shouldBreak) {
      nextElements = R.compose(
        R.prepend(setBreak(false, child)),
        R.slice(i + 1, Infinity),
      )(children);
      break;
    }

    const [currentChildren, nextChildren] = breakChildren(child);

    if (R.isEmpty(nextChildren)) {
      currentElements.push(setChildren(currentChildren)(child));
      continue;
    }

    currentElements.push(setChildren(currentChildren)(child));

    nextElements = R.compose(
      R.prepend(setChildren(nextChildren)(child)),
      R.slice(i + 1, Infinity),
    )(children);

    break;
  }

  return [currentElements, nextElements];
};

const recalculatePageDimensions = R.compose(
  resolvePageDimensions,
  resetHeight,
);

const breakNode = (node) => {
  const [currentChildren, nextChildren] = breakChildren(node);

  if (R.isEmpty(nextChildren)) return [node];

  const currentNode = R.compose(
    recalculatePageDimensions,
    setChildren(currentChildren),
  )(node);

  const nextNode = R.compose(
    recalculatePageDimensions,
    setChildren(nextChildren),
  )(node);

  return [currentNode, nextNode];
};

const breakPage = page => {
  const pages = [];
  // const height = getContentArea(page);

  let nextPage = page;

  while (nextPage) {
    const subpages = breakNode(nextPage);

    nextPage = subpages[1];
    pages.push(subpages[0]);
  }

  return pages;
};

const resolvePageBreaks = R.evolve({
  children: R.map(
    R.evolve({
      children: R.compose(
        R.flatten,
        R.map(breakPage),
      ),
    }),
  ),
});

export default resolvePageBreaks;
