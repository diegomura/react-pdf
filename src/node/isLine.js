import * as R from 'ramda';

import { LINE } from '../constants';

/**
 * Checks if node is line
 *
 * @param {Object} node
 * @returns {Boolean} is node line?
 */
const isLine = R.propEq('type', LINE);

export default isLine;
