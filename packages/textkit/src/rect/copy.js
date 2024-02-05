/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Clone rect
 *
 * @param {Rect} rect rect
 * @returns {Rect} cloned rect
 */
const copy = (rect) => {
  return Object.assign({}, rect);
};

export default copy;
