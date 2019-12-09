import * as R from 'ramda';

import getPadding from '../node/getPadding';

const getContentArea = page => {
  const { paddingTop } = getPadding(page);
  const height = R.path(['style', 'height'], page);
  return height - paddingTop;
};

export default getContentArea;
