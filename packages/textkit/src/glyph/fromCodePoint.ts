import { Font } from '../types';
/**
 * Get glyph for a given code point
 *
 * @param value - CodePoint
 * @param font - Font
 * @returns Glyph
 * */
const fromCodePoint = (value: number | null, font: Font | string | null) => {
  if (typeof font === 'string') return null;
  return font && value ? font.glyphForCodePoint(value) : null;
};

export default fromCodePoint;
