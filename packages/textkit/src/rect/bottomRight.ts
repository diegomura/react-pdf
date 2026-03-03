import { Coordinate, Rect } from '../types';
import maxX from './maxX';
import maxY from './maxY';

const ZERO = { x: 0, y: 0 };

/**
 * Returns rect bottom right coordinate
 *
 * @param rect - Rect
 * @returns Bottom right coordinate
 */
const bottomRight = (rect: Rect | null): Coordinate => {
  return rect ? { x: maxX(rect), y: maxY(rect) } : ZERO;
};

export default bottomRight;
