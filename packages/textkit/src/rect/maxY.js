/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Returns max rect Y coordinate
 *
 * @param {Rect} [rect] rect
 * @returns {number} y coordinate
 */
export default function maxY(rect) {
  return rect ? rect.y + rect.height : 0;
}
