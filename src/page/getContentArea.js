import * as R from 'ramda';

const getPaddingBottom = R.pathOr(0, ['style', 'paddingBottom']);

const getContentArea = page => {
  const paddingBottom = getPaddingBottom(page);
  const height = R.path(['style', 'height'], page);
  return height - paddingBottom;
};

export default getContentArea;
