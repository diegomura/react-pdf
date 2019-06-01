import * as R from 'ramda';

import setPadding from './setPadding';

/**
 * Removes padding on node
 *
 * @param {Object} node
 * @returns {Object} node without padding
 */
const removePaddings = R.compose(
  setPadding(0),
  R.dissocPath(['style', 'padding']),
  R.dissocPath(['style', 'paddingTop']),
  R.dissocPath(['style', 'paddingRight']),
  R.dissocPath(['style', 'paddingBottom']),
  R.dissocPath(['style', 'paddingLeft']),
  R.dissocPath(['style', 'paddingHorizontal']),
  R.dissocPath(['style', 'paddingVertical']),
);

export default removePaddings;
