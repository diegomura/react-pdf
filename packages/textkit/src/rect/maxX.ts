import { Rect } from '../types';

/**
 * Returns max rect X coordinate
 *
 * @param rect - Rect
 * @returns X coordinate
 */
const maxX = (rect: Rect | null) => {
  return rect ? rect.x + rect.width : 0;
};

export default maxX;
