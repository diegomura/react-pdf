import isGlyphWhiteSpace from '../glyph/isWhiteSpace';
import { Run } from '../types';

/**
 * Check if run is entirely whitespace
 *
 * @param run - Run
 * @returns Whether run is entirely whitespace
 */
const isWhiteSpace = (run: Run) => {
  const glyphs = run?.glyphs || [];

  return glyphs.length > 0 && glyphs.every(isGlyphWhiteSpace);
};

export default isWhiteSpace;
