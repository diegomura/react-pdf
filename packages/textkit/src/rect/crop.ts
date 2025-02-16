import { Rect } from '../types';
import partition from './partition';

/**
 * Crop upper section of rect
 *
 * @param height - Height
 * @param rect - Rect
 * @returns Cropped rect
 */
const crop = (height: number, rect: Rect) => {
  const [, result] = partition(rect, height);
  return result;
};

export default crop;
