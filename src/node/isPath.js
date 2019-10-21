import * as R from 'ramda';

import { PATH } from '../constants';

/**
 * Checks if node is path
 *
 * @param {Object} node
 * @returns {Boolean} is node path?
 */
const isPath = R.propEq('type', PATH);

export default isPath;
