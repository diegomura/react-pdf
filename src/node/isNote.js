import * as R from 'ramda';

import { NOTE } from '../constants';

/**
 * Checks if node is note
 *
 * @param {Object} node
 * @returns {Boolean} is node note?
 */
const isNote = R.propEq('type', NOTE);

export default isNote;
