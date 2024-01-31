import isWhiteSpace from '../glyph/isWhiteSpace';

/**
 * @typedef {import('../types.js').Position} Position
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get white space leading positions
 *
 * @param {Run} run run
 * @returns {Position[]} white space leading positions
 */
function leadingPositions(run) {
  const glyphs = run.glyphs || [];
  const positions = run.positions || [];
  const leadingWhitespaces = glyphs.findIndex((g) => !isWhiteSpace(g));

  return positions.slice(0, leadingWhitespaces);
}

/**
 * Get run leading white space offset
 *
 * @param {Run} run run
 * @returns {number} leading white space offset
 */
export default function leadingOffset(run) {
  const positions = leadingPositions(run);

  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
}
