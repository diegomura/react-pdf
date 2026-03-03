import { Font, Glyph } from '../types';

/**
 * Slice glyph between codePoints range.
 * Useful for breaking ligatures into individual glyphs.
 *
 * @param start - Start code point index
 * @param end - End code point index
 * @param font - Font to generate new glyphs from
 * @param glyph - Glyph to be sliced
 * @returns Array of sliced glyph parts
 */
const slice = (
  start: number,
  end: number,
  font: Font,
  glyph: Glyph,
): Glyph[] => {
  if (!glyph) return [];
  if (start === end) return [];

  const { codePoints } = glyph;

  if (start === 0 && end === codePoints.length) return [glyph];
  if (!font) return [glyph];

  const slicedCodePoints = codePoints.slice(start, end);
  const string = String.fromCodePoint(...slicedCodePoints);

  // Force LTR direction to prevent fontkit from reversing the string
  return font.layout(string, undefined, undefined, undefined, 'ltr').glyphs;
};

export default slice;
