import * as R from 'ramda';

import setYogaValue from './setYogaValue';

/**
 * Set flex shrink attribute to node's Yoga instance
 *
 * @param {Number} flex shrink value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexShrink = R.compose(
  setYogaValue('flexShrink'),
  R.defaultTo(1),
);

export default setFlexShrink;
