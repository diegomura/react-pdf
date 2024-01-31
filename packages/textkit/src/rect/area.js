/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Returns rect area
 *
 * @param {Rect} [rect] rect
 * @returns {number} rect area
 */
export default function area(rect) {
  return rect ? rect.height * rect.width : 0;
}
