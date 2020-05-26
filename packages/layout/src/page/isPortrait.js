import * as R from 'ramda';

import getOrientation from './getOrientation';

import { PORTRAIT } from '../constants';

const isPortrait = R.compose(
  R.equals(PORTRAIT),
  getOrientation,
);

export default isPortrait;
