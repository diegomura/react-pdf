import scale from './scale';
import getFont from './getFont';
import isNumber from '../utils/isNumber';
import prependIndices from '../indices/prepend';
import glyphFromCodePoint from '../glyph/fromCodePoint';

/**
 * @typedef {import('../types.js').Glyph} Glyph
 * @typedef {import('../types.js').Position} Position
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Prepend glyph to run
 *
 * @param {Glyph} glyph glyph
 * @param {Run} run run
 * @returns {Run} run with glyph
 */
function prependGlyph(glyph, run) {
  const runScale = scale(run);
  const glyphLength = glyph.codePoints.length;

  const end = run.end + glyphLength;
  const glyphIndices = prependIndices(glyphLength, run.glyphIndices);
  const glyphs = [glyph].concat(run.glyphs);

  const positions = /** @type {Position[]} */ ([
    { xAdvance: glyph.advanceWidth * runScale },
  ]).concat(run.positions);

  return Object.assign({}, run, { end, glyphs, glyphIndices, positions });
}

/**
 * Prepend glyph or code point on run
 *
 * @param {Glyph | number} value glyph or codePoint
 * @param {Run} run run
 * @returns {Run} run with glyph
 */
export default function prepend(value, run) {
  if (!value) return run;

  const font = getFont(run);
  const glyph = isNumber(value) ? glyphFromCodePoint(value, font) : value;

  return prependGlyph(glyph, run);
}
