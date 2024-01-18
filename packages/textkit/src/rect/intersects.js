/**
 * @typedef {Object} Rect
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 */

/**
 * Checks if two rects intersect each other
 *
 * @param {Rect} a
 * @param {Rect} b
 * @returns {boolean} rects intersects
 */
const intersects = (a, b) => {
  const x = Math.max(a.x, b.x);
  const num1 = Math.min(a.x + a.width, b.x + b.width);
  const y = Math.max(a.y, b.y);
  const num2 = Math.min(a.y + a.height, b.y + b.height);

  return num1 >= x && num2 >= y;
};

export default intersects;
