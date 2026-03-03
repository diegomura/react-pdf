import { Font, Glyph } from '../types';

/**
 * Get glyph for a given code point
 *
 * @param codePoint - Unicode code point (0 is treated as invalid)
 * @param font - Font to get glyph from
 * @returns Glyph or null if font/codePoint is invalid
 */
const fromCodePoint = (
  codePoint: number | null,
  font: Font | string | null,
): Glyph | null => {
  // String fonts (e.g., 'Helvetica') don't support glyph lookup
  if (typeof font === 'string') return null;

  // Require valid font and non-zero code point
  if (!font || !codePoint) return null;

  return font.glyphForCodePoint(codePoint);
};

export default fromCodePoint;
