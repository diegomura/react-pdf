const WHITE_SPACES_CODE = 32;

/**
 * Check if glyph is white space
 *
 * @param {Object} glyph
 * @returns {boolean}  is white space
 * */
const isWhiteSpace = (glyph) => {
  const codePoints = glyph?.codePoints || [];
  return codePoints.includes(WHITE_SPACES_CODE);
};

export default isWhiteSpace;
