import { Rect } from '../types';

/**
 * Clone rect
 *
 * @param rect - Rect
 * @returns Cloned rect
 */
const copy = (rect: Rect): Rect => {
  return Object.assign({}, rect);
};

export default copy;
