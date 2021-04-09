/**
 * Get glyph for a given code point
 *
 * @param  {number}  codePoint
 * @param  {Object}  font
 * @return {Object}  glyph
 * */
const fromCodePoint = (value, font) =>
  font && value ? font.glyphForCodePoint(value) : null;

export default fromCodePoint;
