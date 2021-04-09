import * as R from 'ramda';

import glyphIndexAt from './glyphIndexAt';

/**
 * Return glyph at string index, if glyph indices present.
 * Otherwise null
 *
 * @param  {number}  string index
 * @param  {Object}  run
 * @return {Object}  glyph
 */
const glyphAt = (index, run) => {
  const glyphIndex = glyphIndexAt(index, run);
  return R.pathOr(null, ['glyphs', glyphIndex])(run);
};

export default R.curryN(2, glyphAt);
