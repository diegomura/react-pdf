/* eslint-disable import/prefer-default-export */

import * as R from 'ramda';

const matchNumber = R.when(R.is(String), R.test(/^-?\d*\.?\d*$/));

export const castFloat = R.when(matchNumber, v => parseFloat(v, 10));
