import { Rect } from '../types';

/**
 * Returns max rect Y coordinate
 *
 * @param rect - Rect
 * @returns Y coordinate
 */
const maxY = (rect: Rect | null) => {
  return rect ? rect.y + rect.height : 0;
};

export default maxY;
