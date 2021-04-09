import * as R from 'ramda';

import reduce from './reduce';
import runDescent from '../run/descent';

/**
 * Returns attributed string descent
 *
 * @param {Object} attributed string
 * @return {number} descent
 */
const descent = reduce(R.min, runDescent);

export default descent;
