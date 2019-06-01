import * as R from 'ramda';

import { TEXT } from '../constants';

/**
 * Checks if node is text
 *
 * @param {Object} node
 * @returns {Boolean} is node text?
 */
const isText = R.propEq('type', TEXT);

export default isText;
