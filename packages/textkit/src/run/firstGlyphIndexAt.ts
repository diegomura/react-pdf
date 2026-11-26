import glyphIndexAt from './glyphIndexAt';
import { Run } from '../types';

/**
 * Return first glyph index that maps to the given string index.
 *
 * Start boundaries need this, since a decomposed character (e.g. an Arabic
 * base letter followed by a dot mark) maps to several glyphs and
 * `glyphIndexAt` returns the last one.
 *
 * @param index - String index
 * @param run - Run
 * @returns Glyph index
 */
const firstGlyphIndexAt = (index: number, run: Run) => {
  const glyphIndices = run?.glyphIndices;
  let result = glyphIndexAt(index, run);

  if (!glyphIndices) return result;

  while (
    result > 0 &&
    result < glyphIndices.length &&
    glyphIndices[result - 1] === glyphIndices[result]
  ) {
    result -= 1;
  }

  return result;
};

export default firstGlyphIndexAt;
