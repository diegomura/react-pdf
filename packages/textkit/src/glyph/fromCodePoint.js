/**
 * Get glyph for a given code point
 *
 * @param {number} [value] codePoint
 * @param {Object} [font] font
 * @returns {Object} glyph
 * */
const fromCodePoint = (value, font) =>
  font && value ? font.glyphForCodePoint(value) : null;

export default fromCodePoint;
