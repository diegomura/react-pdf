import * as R from 'ramda';

import setYogaValue from './setYogaValue';

/**
 * Set flex grow attribute to node's Yoga instance
 *
 * @param {Number} flex grow value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexGrow = R.compose(
  setYogaValue('flexGrow'),
  R.defaultTo(0),
);

export default setFlexGrow;
