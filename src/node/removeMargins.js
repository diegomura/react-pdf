import * as R from 'ramda';

import {
  setMarginTop,
  setMarginRight,
  setMarginBottom,
  setMarginLeft,
} from './setMargin';

const removeMargins = R.compose(
  setMarginTop(0),
  setMarginRight(0),
  setMarginBottom(0),
  setMarginLeft(0),
  R.dissocPath(['style', 'margin']),
  R.dissocPath(['style', 'marginTop']),
  R.dissocPath(['style', 'marginRight']),
  R.dissocPath(['style', 'marginBottom']),
  R.dissocPath(['style', 'marginLeft']),
  R.dissocPath(['style', 'marginHorizontal']),
  R.dissocPath(['style', 'marginVertical']),
);

export default removeMargins;
