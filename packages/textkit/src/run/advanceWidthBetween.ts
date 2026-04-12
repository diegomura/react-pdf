import glyphIndexAt from './glyphIndexAt';
import positionsAdvanceWidth from '../positions/advanceWidth';
import { Run } from '../types';

/**
 * Advance width between two string indices
 *
 * @param start - Glyph index
 * @param end - Glyph index
 * @param run - Run
 * @returns Advanced width run
 */
const advanceWidthBetween = (start: number, end: number, run: Run) => {
  const runStart = run.start || 0;
  const glyphStartIndex = Math.max(0, glyphIndexAt(start - runStart, run));
  const glyphEndIndex = Math.max(0, glyphIndexAt(end - runStart, run));
  const positions = (run.positions || []).slice(glyphStartIndex, glyphEndIndex);

  return positionsAdvanceWidth(positions);
};

export default advanceWidthBetween;
