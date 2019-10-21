import * as R from 'ramda';

import { RECT } from '../constants';

/**
 * Checks if node is rect
 *
 * @param {Object} node
 * @returns {Boolean} is node rect?
 */
const isRect = R.propEq('type', RECT);

export default isRect;
