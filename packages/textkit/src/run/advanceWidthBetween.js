import glyphIndexAt from './glyphIndexAt';

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

  let acc = 0;
  const positions = run.positions || [];
  const endIndex = Math.min(positions.length, glyphEndIndex);
  for (let i = glyphStartIndex; i < endIndex; i += 1) {
    acc += positions[i].xAdvance || 0;
  }
  return acc;
};

export default advanceWidthBetween;
