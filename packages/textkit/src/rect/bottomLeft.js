import maxY from './maxY';

const ZERO = { x: 0, y: 0 };

/**
 * Returns rect bottom left point
 *
 * @param  {Object}  rect
 * @return {number} bottom left point
 */
const bottomLeft = rect => {
  return rect ? { x: rect.x || 0, y: maxY(rect) } : ZERO;
};

export default bottomLeft;
