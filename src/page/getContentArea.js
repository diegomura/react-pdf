import * as R from 'ramda';

import getPadding from '../node/getPadding';

const getContentArea = (page, pageNumber) => {
  const { paddingTop, paddingBottom } = getPadding(page);
  const height = R.path(['style', 'height'], page);
  return height - paddingTop - (pageNumber !== 1 ? paddingBottom : 0);
};

export default getContentArea;
