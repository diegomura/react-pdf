import scale from './scale';
import getFont from './getFont';
import isNumber from '../utils/isNumber';
import prependIndices from '../indices/prepend';
import glyphFromCodePoint from '../glyph/fromCodePoint';
import { Glyph, Position, Run } from '../types';

/**
 * Prepend glyph to run
 *
 * @param glyph - Glyph
 * @param run - Run
 * @returns Run with glyph
 */
const prependGlyph = (glyph: Glyph, run: Run): Run => {
  const runScale = scale(run);
  const glyphLength = glyph.codePoints.length;

  const end = run.end + glyphLength;
  const glyphIndices = prependIndices(glyphLength, run.glyphIndices);
  const glyphs = [glyph].concat(run.glyphs);

  const positions: Position[] = [
    {
      xAdvance: glyph.advanceWidth * runScale,
      yAdvance: 0,
      xOffset: 0,
      yOffset: 0,
    },
  ].concat(run.positions);

  return Object.assign({}, run, { end, glyphs, glyphIndices, positions });
};

/**
 * Prepend glyph or code point on run
 *
 * @param value - Glyph or codePoint
 * @param run - Run
 * @returns Run with glyph
 */
const prepend = (value: Glyph | number | null, run: Run) => {
  if (!value) return run;

  const font = getFont(run);
  const glyph = isNumber(value) ? glyphFromCodePoint(value, font) : value;

  return prependGlyph(glyph, run);
};

export default prepend;
