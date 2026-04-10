import { Run } from '../types';

/**
 * Return last glyph index that maps to the given string index.
 * Falls back to the string index itself if glyphIndices is not present.
 *
 * When multiple consecutive glyphs point to the same string index
 * (e.g. decomposed characters), returns the last glyph in that group.
 *
 * @param index - String index
 * @param run - Run
 * @returns Glyph index
 */
const glyphIndexAt = (index: number, run: Run) => {
  const glyphIndices = run?.glyphIndices;
  if (!glyphIndices) return index;

  let result = index;

  for (let i = glyphIndices.length - 1; i >= 0; i -= 1) {
    if (glyphIndices[i] <= index) {
      result = i;
      break;
    }
  }

  return result;
};

export default glyphIndexAt;
