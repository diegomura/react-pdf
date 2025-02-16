import { Glyph } from '../types';

const WHITE_SPACES_CODE = 32;

/**
 * Check if glyph is white space
 *
 * @param glyph - Glyph
 * @returns Whether glyph is white space
 * */
const isWhiteSpace = (glyph: Glyph | null) => {
  const codePoints = glyph?.codePoints || [];
  return codePoints.includes(WHITE_SPACES_CODE);
};

export default isWhiteSpace;
