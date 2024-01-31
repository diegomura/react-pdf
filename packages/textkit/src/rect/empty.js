/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Returns empty rect
 *
 * @returns {Rect} empty rect
 */
export default function empty() {
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
}
