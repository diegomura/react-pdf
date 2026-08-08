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

  // If index is past all glyph mappings, return length (one past end)
  if (
    glyphIndices.length > 0 &&
    index > glyphIndices[glyphIndices.length - 1]
  ) {
    return glyphIndices.length;
  }

  let low = 0;
  let high = glyphIndices.length - 1;
  let result = index;

  while (low <= high) {
    const mid = (low + high) >> 1;

    if (glyphIndices[mid] <= index) {
      result = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return result;
};

export default glyphIndexAt;
