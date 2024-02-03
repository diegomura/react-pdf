/**
 * Returns rect area
 *
 * @param {Object}  rect
 * @returns {number} rect area
 */
const area = (rect) => {
  return rect ? rect.height * rect.width : 0;
};

export default area;
