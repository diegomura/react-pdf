import * as R from 'ramda';

import { VIEW } from '../constants';

/**
 * Checks if node is view
 *
 * @param {Object} node
 * @returns {Boolean} is node view?
 */
const isView = R.propEq('type', VIEW);

export default isView;
