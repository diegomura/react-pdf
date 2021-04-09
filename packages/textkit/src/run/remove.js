import * as R from 'ramda';

import copy from './copy';
import slice from './slice';
import concat from './concat';

/**
 * Remove glyph from run in the given index
 *
 * @param  {number}  string index
 * @param  {Object}  run
 * @return {Object}  run without char
 */
const remove = (index, run) => {
  if (index < run.start || index >= run.end) return copy(run);

  // Split resolves ligature splitting in case new glyph breaks some
  const leadingRun = slice(0, index, run);
  const trailingRun = slice(index + 1, Infinity, run);

  return concat(leadingRun, trailingRun);
};

export default R.curryN(2, remove);
