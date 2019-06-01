import * as R from 'ramda';

import {
  setPaddingTop,
  setPaddingRight,
  setPaddingBottom,
  setPaddingLeft,
} from './setPadding';

const removePaddings = R.compose(
  setPaddingTop(0),
  setPaddingRight(0),
  setPaddingBottom(0),
  setPaddingLeft(0),
  R.dissocPath(['style', 'padding']),
  R.dissocPath(['style', 'paddingTop']),
  R.dissocPath(['style', 'paddingRight']),
  R.dissocPath(['style', 'paddingBottom']),
  R.dissocPath(['style', 'paddingLeft']),
  R.dissocPath(['style', 'paddingHorizontal']),
  R.dissocPath(['style', 'paddingVertical']),
);

export default removePaddings;
