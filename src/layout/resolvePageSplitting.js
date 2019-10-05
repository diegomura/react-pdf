import * as R from 'ramda';

import splitNode from '../node/split';
import getContentArea from '../page/getContentArea';

const splitPage = page => {
  if (!page) return [];
  const height = getContentArea(page);

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

const resolvePageSplitting = root =>
  R.evolve({
    children: R.map(
      R.evolve({
        children: R.compose(
          R.flatten,
          R.map(splitPage),
        ),
      }),
    ),
  })(root);

export default resolvePageSplitting;
