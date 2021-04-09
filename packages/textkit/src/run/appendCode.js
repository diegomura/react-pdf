import * as R from 'ramda';

import insert from './insert';

/**
 * Append code point on run
 *
 * @param  {number}  code point
 * @param  {Object}  run
 * @return {Object} run with glyph
 */
const appendCode = (codePoint, run) => insert(run.end, codePoint, run);

export default R.curryN(2, appendCode);
