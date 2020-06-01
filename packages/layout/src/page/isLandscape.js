import * as R from 'ramda';

import getOrientation from './getOrientation';

const isLandscape = R.compose(
  R.equals('landscape'),
  getOrientation,
);

export default isLandscape;
