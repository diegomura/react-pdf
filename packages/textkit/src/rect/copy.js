/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Clone rect
 *
 * @param {Rect} rect rect
 * @returns {Rect} cloned rect
 */
export default function copy(rect) {
  return Object.assign({}, rect);
}
