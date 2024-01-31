/**
 * @typedef {import('../types.js').Font} Font
 * @typedef {import('../types.js').Glyph} Glyph
 */

/**
 * Slice glyph between codePoints range
 * Util for breaking ligatures
 *
 * @param {number} start start code point index
 * @param {number} end end code point index
 * @param {Font} font font to generate new glyph
 * @param {Glyph} glyph glyph to be sliced
 * @returns {Glyph[]} sliced glyph parts
 */
export default function slice(start, end, font, glyph) {
  if (!glyph) return [];
  if (start === end) return [];
  if (start === 0 && end === glyph.codePoints.length) return [glyph];

  const codePoints = glyph.codePoints.slice(start, end);
  const string = String.fromCodePoint(...codePoints);
  return font ? font.layout(string).glyphs : [glyph];
}
