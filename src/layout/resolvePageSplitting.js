import * as R from 'ramda';

import splitNode from '../node/split';

const getPaddingBottom = R.pathOr(0, ['style', 'paddingBottom']);

const getWrappingArea = page => {
  const paddingBottom = getPaddingBottom(page);
  const height = R.path(['style', 'height'], page);
  return height - paddingBottom;
};

const splitPage = page => {
  if (!page) return [];

  const height = getWrappingArea(page);
  let splittedPage = splitNode(height, page);
  const pages = [splittedPage[0]];
  let nextPage = splittedPage[1];

  while (nextPage !== null) {
    splittedPage = splitNode(height, nextPage);
    pages.push(splittedPage[0]);
    nextPage = splittedPage[1];
  }

  return pages;
};

const resolvePageSplitting = R.evolve({
  children: R.map(
    R.evolve({
      children: R.compose(
        R.flatten,
        R.map(splitPage),
      ),
    }),
  ),
});

export default resolvePageSplitting;
