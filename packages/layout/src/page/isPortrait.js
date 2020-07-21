import * as R from 'ramda';

import getOrientation from './getOrientation';

const isPortrait = R.compose(
  R.equals('portrait'),
  getOrientation,
);

export default isPortrait;
