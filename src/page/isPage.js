import * as R from 'ramda';

import { PAGE } from '../constants';

/**
 * Checks if node is page
 *
 * @param {Object} node
 * @returns {Boolean} is node page?
 */
const isPage = R.propEq('type', PAGE);

export default isPage;
