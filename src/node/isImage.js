import * as R from 'ramda';

import { IMAGE } from '../constants';

/**
 * Checks if node is image
 *
 * @param {Object} node
 * @returns {Boolean} is node image?
 */
const isImage = R.propEq('type', IMAGE);

export default isImage;
