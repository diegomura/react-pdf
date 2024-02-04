/**
 * @typedef {import('../types.js').Position} Position
 */

/**
 * Return positions advance width
 *
 * @param {Position[]} positions positions
 * @returns {number} advance width
 */
const advanceWidth = (positions) => {
  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};

export default advanceWidth;
