import * as R from 'ramda';

import reduce from './reduce';
import runAdvanceWidth from '../run/advanceWidth';

/**
 * Returns attributed string advancewidth
 *
 * @param {Object} attributed string
 * @return {number} advance width
 */
const advanceWidth = reduce(R.add, runAdvanceWidth);

export default advanceWidth;
