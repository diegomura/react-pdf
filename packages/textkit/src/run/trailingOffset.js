import isWhiteSpace from '../glyph/isWhiteSpace';

/**
 * @typedef {import('../types.js').Position} Position
 * @typedef {import('../types.js').Run} Run
 */

/**
 * @template T
 * @param {T[]} array
 * @returns {T[]} reversed array
 */
const reverse = (array) => {
  return [...array].reverse();
};

/**
 * Get white space trailing positions
 *
 * @param {Run} run run
 * @returns {Position[]} white space trailing positions
 */
const trailingPositions = (run) => {
  const glyphs = reverse(run.glyphs || []);
  const positions = reverse(run.positions || []);
  const leadingWhitespaces = glyphs.findIndex((g) => !isWhiteSpace(g));

  return positions.slice(0, leadingWhitespaces);
};

/**
 * Get run trailing white space offset
 *
 * @param {Run} run run
 * @returns {number} trailing white space offset
 */
const trailingOffset = (run) => {
  const positions = trailingPositions(run);

  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};

export default trailingOffset;
