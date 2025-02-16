import maxY from './maxY';
import { Coordinate, Rect } from '../types';

const ZERO = { x: 0, y: 0 };

/**
 * Returns rect bottom left coordinate
 *
 * @param rect - Rect
 * @returns Bottom left coordinate
 */
const bottomLeft = (rect: Rect | null): Coordinate => {
  return rect ? { x: rect.x || 0, y: maxY(rect) } : ZERO;
};

export default bottomLeft;
