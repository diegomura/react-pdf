import scale from './scale';
import getFont from './getFont';
import isNumber from '../utils/isNumber';
import prependIndices from '../indices/prepend';
import glyphFromCodePoint from '../glyph/fromCodePoint';

/**
 * Prepend glyph to run
 *
 * @param  {Object}  glyph
 * @param  {Object}  run
 * @return {Object} run with glyph
 */
const prependGlyph = (glyph, run) => {
  const runScale = scale(run);
  const glyphLength = glyph.codePoints.length;

  const end = run.end + glyphLength;
  const glyphIndices = prependIndices(glyphLength, run.glyphIndices);
  const glyphs = [glyph].concat(run.glyphs);
  const positions = [{ xAdvance: glyph.advanceWidth * runScale }].concat(
    run.positions,
  );

  return Object.assign({}, run, { end, glyphs, glyphIndices, positions });
};

/**
 * Prepend glyph or code point on run
 *
 * @param  {Object | number}  glyph | codePoint
 * @param  {Object}  run
 * @return {Object} run with glyph
 */
const prepend = (value, run) => {
  if (!value) return run;

  const font = getFont(run);
  const glyph = isNumber(value) ? glyphFromCodePoint(value, font) : value;

  return prependGlyph(glyph, run);
};

export default prepend;
