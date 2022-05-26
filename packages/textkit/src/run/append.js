import * as R from 'ramda';

import copy from './copy';
import scale from './scale';
import getFont from './getFont';
import isNumber from '../utils/isNumber';
import appendIndices from '../indices/append';
import glyphFromCodePoint from '../glyph/fromCodePoint';

/**
 * Append glyph to run
 *
 * @param  {Object}  glyph
 * @param  {Object}  run
 * @return {Object} run with glyph
 */
const appendGlyph = (glyph, run) => {
  const runScale = scale(run);
  const glyphLength = R.length(glyph.codePoints);

  return R.evolve({
    end: R.add(glyphLength),
    glyphs: R.append(glyph),
    glyphIndices: indices => appendIndices(glyphLength, indices),
    positions: R.append({ xAdvance: glyph.advanceWidth * runScale }),
  })(run);
};

/**
 * Append glyph or code point to run
 *
 * @param  {Object | number}  glyph | codePoint
 * @param  {Object}  run
 * @return {Object} run with glyph
 */
const append = (value, run) => {
  if (!value) return copy(run);

  const font = getFont(run);
  const glyph = isNumber(value) ? glyphFromCodePoint(value, font) : value;

  return appendGlyph(glyph, run);
};

export default R.curryN(2, append);
