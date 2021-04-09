import * as R from 'ramda';

import reduce from './reduce';
import runAscent from '../run/ascent';

/**
 * Returns attributed string ascent
 *
 * @param {Object} attributed string
 * @return {number} ascent
 */
const ascent = reduce(R.max, runAscent);

export default ascent;
