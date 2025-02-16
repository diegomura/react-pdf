import { Rect } from '../types';

/**
 * Returns rect area
 *
 * @param rect - Rect
 * @returns Rect area
 */
const area = (rect: Rect | null) => {
  return rect ? rect.height * rect.width : 0;
};

export default area;
