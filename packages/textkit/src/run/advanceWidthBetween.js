import glyphIndexAt from './glyphIndexAt';
import positionsAdvanceWidth from '../positions/advanceWidth';

/**
 * Advance width between two string indices
 *
 * @param  {number}  start glyph index
 * @param  {number}  end glyph index
 * @param  {Object}  run
 * @return {Object} advanced width run
 */
const advanceWidthBetween = (start, end, run) => {
  const runStart = run.start || 0;
  const glyphStartIndex = Math.max(0, glyphIndexAt(start - runStart, run));
  const glyphEndIndex = Math.max(0, glyphIndexAt(end - runStart, run));
  const positions = (run.positions || []).slice(glyphStartIndex, glyphEndIndex);

  return positionsAdvanceWidth(positions);
};

export default advanceWidthBetween;
