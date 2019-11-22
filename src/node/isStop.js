import * as R from 'ramda';

import { STOP } from '../constants';

/**
 * Checks if node is stop
 *
 * @param {Object} node
 * @returns {Boolean} is node stop?
 */
const isStop = R.propEq('type', STOP);

export default isStop;
