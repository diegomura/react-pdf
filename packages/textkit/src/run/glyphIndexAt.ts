import { isNil } from '@react-pdf/fns';
import { Run } from '../types';

/**
 * Return glyph index at string index, if glyph indices present.
 * Otherwise return string index
 *
 * @param index - Index
 * @param run - Run
 * @returns Glyph index
 */
const glyphIndexAt = (index: number, run: Run) => {
  const result = run?.glyphIndices?.[index];
  return isNil(result) ? index : result;
};

export default glyphIndexAt;
