import * as R from 'ramda';

import { DOCUMENT } from '../constants';

/**
 * Checks if node is document
 *
 * @param {Object} node
 * @returns {Boolean} is node document?
 */
const isDocument = R.propEq('type', DOCUMENT);

export default isDocument;
