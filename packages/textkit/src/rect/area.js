/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Returns rect area
 *
 * @param {Rect} [rect] rect
 * @returns {number} rect area
 */
const area = (rect) => {
  return rect ? rect.height * rect.width : 0;
};

export default area;
