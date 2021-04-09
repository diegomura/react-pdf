import * as R from 'ramda';

/**
 * Return glyph index at string index, if glyph indices present.
 * Otherwise return string index
 *
 * @param  {number}  string index
 * @param  {Object}  run
 * @return {number}  glyph index
 */
const glyphIndexAt = (index, run) =>
  R.pathOr(index, ['glyphIndices', index])(run);

export default R.curryN(2, glyphIndexAt);
