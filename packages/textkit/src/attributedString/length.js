import * as R from 'ramda';

import start from './start';
import end from './end';

/**
 * Get attributed string length
 *
 * @param  {Object}  glyph string
 * @return {number} end
 */
const length = R.converge(R.subtract, [end, start]);

export default length;
