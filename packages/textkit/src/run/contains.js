import * as R from 'ramda';

import isBetween from '../utils/isBetween';

/**
 * Checks if run contains value
 *
 * @param  {number}  value
 * @param  {Object}  run
 * @return {boolean} runs contains value
 */
const contains = isBetween(R.prop('start'), R.prop('end'));

export default contains;
