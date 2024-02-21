/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Check if two rect are equal
 *
 * @param {Object} a rect A
 * @param {Object} b rect B
 * @returns {boolean} whether rects are equal
 *
 */
const equals = (a, b) => {
  return (
    a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
  );
};

export default equals;
