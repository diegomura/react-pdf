import * as R from 'ramda';

import { TSPAN } from '../constants';

/**
 * Checks if node is tspan
 *
 * @param {Object} node
 * @returns {Boolean} is node tspan?
 */
const isTspan = R.propEq('type', TSPAN);

export default isTspan;
