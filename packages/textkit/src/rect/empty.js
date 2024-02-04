/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Returns empty rect
 *
 * @returns {Rect} empty rect
 */
const empty = () => {
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
};

export default empty;
