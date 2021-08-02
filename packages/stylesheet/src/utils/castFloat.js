/* eslint-disable import/prefer-default-export */

import * as R from 'ramda';

const matchNumber = R.when(R.is(String), R.test(/^-?\d*\.?\d*$/));

const castFloat = value => {
  if (typeof value !== 'string') return value;
  if (matchNumber(value)) return parseFloat(value, 10);
  return value;
};

export default castFloat;
