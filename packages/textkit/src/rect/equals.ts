import { Rect } from '../types';

/**
 * Check if two rect are equal
 *
 * @param a - Rect A
 * @param b - Rect B
 * @returns Whether rects are equal
 *
 */
const equals = (a: Rect, b: Rect) => {
  return (
    a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
  );
};

export default equals;
