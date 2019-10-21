import * as R from 'ramda';

import { GROUP } from '../constants';

/**
 * Checks if node is group
 *
 * @param {Object} node
 * @returns {Boolean} is node group?
 */
const isGroup = R.propEq('type', GROUP);

export default isGroup;
