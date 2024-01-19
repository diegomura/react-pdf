/**
 * Returns max rect X coordinate
 *
 * @param {Object}  rect
 * @returns {number} x coordinate
 */
const maxX = rect => {
  return rect ? rect.x + rect.width : 0;
};

export default maxX;
