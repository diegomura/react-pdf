import * as R from 'ramda';

import { LINEAR_GRADIENT } from '../constants';

/**
 * Checks if node is linear gradient
 *
 * @param {Object} node
 * @returns {Boolean} is node linear gradient?
 */
const isLinearGradient = R.propEq('type', LINEAR_GRADIENT);

export default isLinearGradient;
