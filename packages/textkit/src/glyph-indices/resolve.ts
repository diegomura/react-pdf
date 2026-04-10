import { Glyph } from '../types';

/**
 * Resolve glyph indices based on glyphs code points.
 * Maps each glyph to its starting character index in the original string,
 * accounting for ligatures where a single glyph represents multiple code points.
 *
 * @param glyphs - Array of glyphs (may contain undefined for missing glyphs)
 * @returns Array of character indices, one per glyph
 */
const resolve = (glyphs: (Glyph | undefined)[] = []): number[] => {
  const result: number[] = [];
  let currentIndex = 0;

  for (let i = 0; i < glyphs.length; i += 1) {
    const glyph = glyphs[i];
    const length = glyph?.codePoints?.length || 0;
    const value = length === 0 ? result[i - 1] : currentIndex;

    result.push(value);
    currentIndex += length;
  }

  return result;
};

export default resolve;
