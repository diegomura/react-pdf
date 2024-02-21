import partition from './partition';

/**
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Crop upper section of rect
 *
 * @param {number} height height
 * @param {Rect} rect rect
 * @returns {Rect} cropped rect
 */
const crop = (height, rect) => {
  const [, result] = partition(rect, height);
  return result;
};

export default crop;
