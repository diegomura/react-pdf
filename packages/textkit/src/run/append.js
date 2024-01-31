import scale from './scale';
import getFont from './getFont';
import isNumber from '../utils/isNumber';
import appendIndices from '../indices/append';
import glyphFromCodePoint from '../glyph/fromCodePoint';

/**
 * @typedef {import('../types.js').Glyph} Glyph
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Append glyph to run
 *
 * @param {Glyph} glyph glyph
 * @param {Run} run run
 * @returns {Run} run with glyph
 */
function appendGlyph(glyph, run) {
  const glyphLength = glyph.codePoints?.length || 0;
  const end = run.end + glyphLength;
  const glyphs = run.glyphs.concat(glyph);
  const glyphIndices = appendIndices(glyphLength, run.glyphIndices);

  if (!run.positions)
    return Object.assign({}, run, { end, glyphs, glyphIndices });

  const positions = run.positions.concat({
    xAdvance: glyph.advanceWidth * scale(run),
  });

  return Object.assign({}, run, { end, glyphs, glyphIndices, positions });
}

/**
 * Append glyph or code point to run
 *
 * @param {Glyph | number | undefined} value glyph or codePoint
 * @param {Run} run run
 * @returns {Run} run with glyph
 */
export default function append(value, run) {
  if (!value) return run;

  const font = getFont(run);
  const glyph = isNumber(value) ? glyphFromCodePoint(value, font) : value;

  return appendGlyph(glyph, run);
}
