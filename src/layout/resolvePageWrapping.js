import * as R from 'ramda';

const getWrappingHeight = page => {
  const paddingTop = R.pathOr(0, ['style', 'paddingTop'], page);
  const paddingBottom = R.pathOr(0, ['style', 'paddingBottom'], page);
  const height = R.path(['style', 'height'], page);

  return height - paddingTop - paddingBottom;
};

const wrapNode = (height, node) => {
  console.log(height, node);
};

const wrapPage = page => {
  const height = getWrappingHeight(page);
  // console.log('wrapPage', page, 'in', );

  wrapNode(height, page.children[0]);

  return page;
};

const resolvePageWrapping = R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(wrapPage),
    }),
  ),
});

export default resolvePageWrapping;
