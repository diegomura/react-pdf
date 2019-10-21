import * as R from 'ramda';

import { CIRCLE } from '../constants';

/**
 * Checks if node is circle
 *
 * @param {Object} node
 * @returns {Boolean} is node circle?
 */
const isCircle = R.propEq('type', CIRCLE);

export default isCircle;
