import isWhiteSpace from '../glyph/isWhiteSpace';

/**
 * @template T
 * @param {T[]} array
 * @returns {T[]} reversed array
 */
const reverse = (array) => [...array].reverse();

/**
 * Get white space trailing positions
 *
 * @param {Object} run
 * @returns {Object[]} white space trailing positions
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
 * @param {Object}  run
 * @returns {number} trailing white space offset
 */
const trailingOffset = (run) => {
  const positions = trailingPositions(run);

  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};

export default trailingOffset;
