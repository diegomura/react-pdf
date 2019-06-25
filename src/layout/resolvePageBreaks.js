import * as R from 'ramda';

import { resolvePageDimensions } from './resolveDimensions';

const getHeight = R.path(['box', 'height']);

const getTop = R.pathOr(0, ['box', 'top']);

const getChildren = R.propOr([], 'children');

const getBreak = R.pathOr(false, ['props', 'break']);

const getPaddingBottom = R.pathOr(0, ['style', 'paddingBottom']);

// const getWrap = R.pathOr(true, ['props', 'wrap']);

// const getMinPresenceAhead = R.path(['props', 'minPresenceAhead']);

// const defaultPresenceAhead = element => height =>
//   Math.min(element.box.height, height);

// const getPresenceAhead = (elements, height) => {
//   let result = 0;

//   for (let i = 0; i < elements.length; i++) {
//     const element = elements[i];

//     if (!element.box) continue;

//     const isElementInside = height > element.box.top;
//     const presenceAhead =
//       element.props.presenceAhead || defaultPresenceAhead(element);

//     if (element && isElementInside) {
//       result += presenceAhead(height - element.box.top);
//     }
//   }

//   return result;
// };

// const shouldElementBreak = (child, futureElements, height) => {
//   const minPresenceAhead = getMinPresenceAhead(child);
//   const presenceAhead = getPresenceAhead(futureElements, height);
//   return getBreak(child) || presenceAhead < minPresenceAhead;
// };

const getWrappingArea = page => {
  const paddingBottom = getPaddingBottom(page);
  const height = R.path(['style', 'height'], page);
  return height - paddingBottom;
};

const breakChildren = (height, node) => {
  const children = getChildren(node);

  let offset = null;
  let nextElements = [];
  const currentElements = [];

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const childTop = getTop(child);
    const childHeight = getHeight(child);
    const shouldBreak = getBreak(child);

    if (shouldBreak) {
      offset = childTop;
      nextElements = R.compose(
        R.prepend(R.evolve({ props: { break: R.always(false) } }, child)),
        R.slice(i + 1, Infinity),
      )(children);
      break;
    }

    const [currentChildren, nextChildren, childsOffset] = breakChildren(
      height,
      child,
    );

    if (R.isNil(childsOffset)) {
      currentElements.push(
        R.evolve({ children: R.always(currentChildren) })(child),
      );
      continue;
    }

    offset = childTop + childsOffset;

    currentElements.push(
      R.evolve({
        children: R.always(currentChildren),
        box: {
          height: R.always(Math.ceil(offset / height) * height - childTop),
        },
      })(child),
    );

    nextElements = R.compose(
      R.prepend(
        R.evolve({
          children: R.always(nextChildren),
          box: { height: R.subtract(R.__, childHeight) },
        })(child),
      ),
      R.slice(i + 1, Infinity),
    )(children);

    break;
  }

  return [currentElements, nextElements, offset];
};

const breakNode = height => node => {
  const [currentChildren, nextChildren, offset] = breakChildren(height, node);

  if (R.isNil(offset)) return [node];

  const currentNode = R.evolve({
    children: R.always(currentChildren),
    box: { height: R.always(Math.ceil(offset / height) * height) },
  })(node);

  const nextNode = R.evolve({
    children: R.always(nextChildren),
    box: { height: R.subtract(R.__, offset) },
  })(node);

  return [currentNode, nextNode];
};

const breakPage = page => {
  const pages = [];
  const height = getWrappingArea(page);

  let subpages = breakNode(height)(page);
  let current = subpages[0];
  let nextPage = subpages[1];

  pages.push(current);

  while (nextPage) {
    subpages = R.compose(
      breakNode(height),
      resolvePageDimensions,
      R.evolve({ box: { height: R.always(null) } }),
    )(nextPage);

    current = subpages[0];
    nextPage = subpages[1];

    pages.push(current);
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
