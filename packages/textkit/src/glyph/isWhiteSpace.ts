import { Glyph } from '../types';

/**
 * ASCII code for space character.
 * Note: Only space (32) is considered whitespace for typographic layout purposes,
 * not tabs, newlines, or other control characters.
 */
const SPACE_CODE = 32;

/**
 * Check if glyph contains a space character
 *
 * @param glyph - Glyph
 * @returns Whether glyph contains a space
 */
const isWhiteSpace = (glyph: Glyph | null) => {
  const codePoints = glyph?.codePoints || [];
  return codePoints.includes(SPACE_CODE);
};

export default isWhiteSpace;
