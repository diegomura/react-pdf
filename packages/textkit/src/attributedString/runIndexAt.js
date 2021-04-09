import * as R from 'ramda';

import runIndexAtInternal from '../run/runIndexAt';

/**
 * Get run index at char index
 *
 * @param  {number}  char index
 * @param  {Object}  attributedString
 * @return {number} run index
 */
const runIndexAt = (n, string) =>
  R.compose(runIndexAtInternal(n), R.prop('runs'))(string);

export default R.curryN(2, runIndexAt);
