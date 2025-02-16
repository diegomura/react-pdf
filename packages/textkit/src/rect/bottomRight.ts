import { Coordinate, Rect } from '../types';
import maxX from './maxX';
import maxY from './maxY';

/**
 * Returns rect bottom right coordinate
 *
 * @param rect - Rect
 * @returns Bottom right coordinate
 */
const bottomRight = (rect: Rect | null): Coordinate => ({
  x: maxX(rect),
  y: maxY(rect),
});

export default bottomRight;
