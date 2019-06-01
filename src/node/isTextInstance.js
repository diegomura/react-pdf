import * as R from 'ramda';

import { TEXT_INSTANCE } from '../constants';

/**
 * Checks if node is text intance
 *
 * @param {Object} node
 * @returns {Boolean} is node text intance?
 */
const isTextInstance = R.propEq('type', TEXT_INSTANCE);

export default isTextInstance;
