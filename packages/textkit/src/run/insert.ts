import slice from './slice';
import concat from './concat';
import append from './append';
import getFont from './getFont';
import isNumber from '../utils/isNumber';
import glyphFromCodePoint from '../glyph/fromCodePoint';
import { Glyph, Run } from '../types';

/**
 * Insert glyph to run in the given index
 *
 * @param index - Index
 * @param glyph - Glyph
 * @param run - Run
 * @returns Run with glyph
 */
const insertGlyph = (index: number, glyph: Glyph, run: Run) => {
  if (!glyph) return run;

  // Split resolves ligature splitting in case new glyph breaks some
  const leadingRun = slice(0, index, run);
  const trailingRun = slice(index, Infinity, run);

  return concat(append(glyph, leadingRun), trailingRun);
};

/**
 * Insert either glyph or code point to run in the given index
 *
 * @param index - Index
 * @param value - Glyph or codePoint
 * @param run - Run
 * @returns Run with glyph
 */
const insert = (index: number, value: Glyph | number | null, run: Run) => {
  const font = getFont(run);
  const glyph = isNumber(value) ? glyphFromCodePoint(value, font) : value;
  return insertGlyph(index, glyph, run);
};

export default insert;
