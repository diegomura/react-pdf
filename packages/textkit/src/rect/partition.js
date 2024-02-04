/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 *
 * @param {Rect} rect rect
 * @param {number} height height
 * @returns {[Rect, Rect]} partitioned rects
 */
const partition = (rect, height) => {
  const a = Object.assign({}, rect, { height });

  const b = Object.assign({}, rect, {
    y: rect.y + height,
    height: rect.height - height,
  });

  return [a, b];
};

export default partition;
