import * as R from 'ramda';

import { LINK } from '../constants';

/**
 * Checks if node is link
 *
 * @param {Object} node
 * @returns {Boolean} is node link?
 */
const isLink = R.propEq('type', LINK);

export default isLink;
