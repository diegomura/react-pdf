import * as R from 'ramda';

import { CANVAS } from '../constants';

/**
 * Checks if node is canvas
 *
 * @param {Object} node
 * @returns {Boolean} is node canvas?
 */
const isCanvas = R.propEq('type', CANVAS);

export default isCanvas;
