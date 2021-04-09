import * as R from 'ramda';

import reduce from './reduce';
import runHeight from '../run/height';

/**
 * Returns attributed string height
 *
 * @param {Object} attributed string
 * @return {number} height
 */
const height = reduce(R.max, runHeight);

export default height;
