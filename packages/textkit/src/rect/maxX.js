/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Returns max rect X coordinate
 *
 * @param {Rect} [rect] rect
 * @returns {number} x coordinate
 */
export default function maxX(rect) {
  return rect ? rect.x + rect.width : 0;
}
