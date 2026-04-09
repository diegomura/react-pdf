import { Glyph } from '../types';

/**
 * Resolve string indices based on glyphs code points.
 * Maps each glyph to its corresponding string index, handling ligatures
 * by assigning the same index to all code points within a ligature.
 *
 * @param glyphs - Array of glyphs (may contain undefined for missing glyphs)
 * @returns Glyph indices array
 */
const resolve = (glyphs: (Glyph | undefined)[] = []): number[] => {
  const result: number[] = [];
  let currentIndex = 0;

  for (let i = 0; i < glyphs.length; i += 1) {
    const glyph = glyphs[i];
    const codePointCount = glyph?.codePoints?.length || 1;

    for (let j = 0; j < codePointCount; j += 1) {
      result.push(currentIndex);
    }

    currentIndex += 1;
  }

  return result;
};

export default resolve;
