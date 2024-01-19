/**
 * Return positions advance width
 *
 * @param {Object}  positions
 * @returns {number} advance width
 */
const advanceWidth = positions => {
  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};

export default advanceWidth;
