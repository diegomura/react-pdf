import isWhiteSpace from '../glyph/isWhiteSpace';

/**
 * Get white space leading positions
 *
 * @param {Object} run
 * @returns {Object[]} white space leading positions
 */
const leadingPositions = (run) => {
  const glyphs = run.glyphs || [];
  const positions = run.positions || [];
  const leadingWhitespaces = glyphs.findIndex((g) => !isWhiteSpace(g));

  return positions.slice(0, leadingWhitespaces);
};

/**
 * Get run leading white space offset
 *
 * @param {Object}  run
 * @returns {number} leading white space offset
 */
const leadingOffset = (run) => {
  const positions = leadingPositions(run);

  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};

export default leadingOffset;
