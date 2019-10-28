import * as R from 'ramda';

import { DEFS } from '../constants';

/**
 * Checks if node is svg defs
 *
 * @param {Object} node
 * @returns {Boolean} is node svg defs?
 */
const isDefs = R.propEq('type', DEFS);

export default isDefs;
