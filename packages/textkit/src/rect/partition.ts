import { Rect } from '../types';

/**
 * Partition rect in two in the vertical direction
 *
 * @param rect - Rect
 * @param height - Height
 * @returns Partitioned rects
 */
const partition = (rect: Rect, height: number): [Rect, Rect] => {
  const a = Object.assign({}, rect, { height });

  const b = Object.assign({}, rect, {
    y: rect.y + height,
    height: rect.height - height,
  });

  return [a, b];
};

export default partition;
