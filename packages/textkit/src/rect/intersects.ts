import { Rect } from '../types';

/**
 * Checks if two rects intersect each other
 *
 * @param a - Rect A
 * @param b - Rect B
 * @returns Whether rects intersect
 */
const intersects = (a: Rect, b: Rect) => {
  const x = Math.max(a.x, b.x);
  const num1 = Math.min(a.x + a.width, b.x + b.width);
  const y = Math.max(a.y, b.y);
  const num2 = Math.min(a.y + a.height, b.y + b.height);

  return num1 >= x && num2 >= y;
};

export default intersects;
