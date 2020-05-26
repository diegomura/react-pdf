import * as R from 'ramda';

import getOrientation from './getOrientation';

import { LANDSCAPE } from '../constants';

const isLandscape = R.compose(
  R.equals(LANDSCAPE),
  getOrientation,
);

export default isLandscape;
