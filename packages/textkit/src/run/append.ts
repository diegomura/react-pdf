import scale from './scale';
import getFont from './getFont';
import isNumber from '../utils/isNumber';
import appendIndices from '../indices/append';
import glyphFromCodePoint from '../glyph/fromCodePoint';
import { Glyph, Run } from '../types';

/**
 * Append glyph to run
 *
 * @param glyph - Glyph
 * @param run - Run
 * @returns Run with glyph
 */
const appendGlyph = (glyph: Glyph, run: Run): Run => {
  const glyphLength = glyph.codePoints?.length || 0;
  const end = run.end + glyphLength;
  const glyphs = run.glyphs.concat(glyph);
  const glyphIndices = appendIndices(glyphLength, run.glyphIndices);

  if (!run.positions)
    return Object.assign({}, run, { end, glyphs, glyphIndices });

  const positions = run.positions.concat({
    xAdvance: glyph.advanceWidth * scale(run),
    yAdvance: 0,
    xOffset: 0,
    yOffset: 0,
  });

  return Object.assign({}, run, { end, glyphs, glyphIndices, positions });
};

/**
 * Append glyph or code point to run
 *
 * @param value - Glyph or codePoint
 * @param run - Run
 * @returns Run with glyph
 */
const append = (value: Glyph | number | null, run: Run): Run => {
  if (!value) return run;

  const font = getFont(run);
  const glyph = isNumber(value) ? glyphFromCodePoint(value, font) : value;

  return appendGlyph(glyph, run);
};

export default append;
