import * as R from 'ramda';

import getPadding from '../node/getPadding'

const getContentArea = page => {
  const { paddingTop, paddingBottom } = getPadding(page);
  const height = R.path(['style', 'height'], page);
  return height - paddingTop - paddingBottom;
};

export default getContentArea;
