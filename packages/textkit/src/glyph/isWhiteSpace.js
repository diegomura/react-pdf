/**
 * @typedef {import('../types.js').Glyph} Glyph
 */

const WHITE_SPACES_CODE = 32;

/**
 * Check if glyph is white space
 *
 * @param {Glyph} [glyph] glyph
 * @returns {boolean} whether glyph is white space
 * */
const isWhiteSpace = (glyph) => {
  const codePoints = glyph?.codePoints || [];
  return codePoints.includes(WHITE_SPACES_CODE);
};

export default isWhiteSpace;
