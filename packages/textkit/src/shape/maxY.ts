import { ExclusionShape } from '../types';

/**
 * Returns max shape Y coordinate
 *
 * @param shape - Exclusion shape
 * @returns Y coordinate
 */
const maxY = (shape: ExclusionShape) => {
  if (shape.type === 'ellipse') return shape.cy + shape.ry;

  if (shape.type === 'polygon') {
    let max = -Infinity;
    for (let i = 0; i < shape.points.length; i += 1) {
      max = Math.max(max, shape.points[i].y);
    }
    return max;
  }

  return shape.y + shape.height;
};

export default maxY;
