import slice from './slice';
import concat from './concat';
import append from './append';
import getFont from './getFont';
import isNumber from '../utils/isNumber';
import glyphFromCodePoint from '../glyph/fromCodePoint';

/**
 * @typedef {import('../types.js').Glyph} Glyph
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Insert glyph to run in the given index
 *
 * @param {number} index index
 * @param {Glyph} glyph glyph
 * @param {Run} run run
 * @returns {Run} run with glyph
 */
const insertGlyph = (index, glyph, run) => {
  if (!glyph) return run;

  // Split resolves ligature splitting in case new glyph breaks some
  const leadingRun = slice(0, index, run);
  const trailingRun = slice(index, Infinity, run);

  return concat(append(glyph, leadingRun), trailingRun);
};

/**
 * Insert either glyph or code point to run in the given index
 *
 * @param {number} index index
 * @param {Glyph | number} value glyph or codePoint
 * @param {Run} run run
 * @returns {Run} run with glyph
 */
const insert = (index, value, run) => {
  const font = getFont(run);
  const glyph = isNumber(value) ? glyphFromCodePoint(value, font) : value;
  return insertGlyph(index, glyph, run);
};

export default insert;
