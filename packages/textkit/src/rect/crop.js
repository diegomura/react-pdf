import partition from './partition';

/**
 * Crop upper section of rect
 *
 * @param {Object}  rect
 * @returns {Object} cropped rect
 */
const crop = (height, rect) => {
  const [, result] = partition(rect, height);
  return result;
};

export default crop;
