/**
 * Crop upper section of rect
 *
 * @param  {Object}  rect
 * @return {Object} cropped rect
 */
const crop = (height, rect) => {
  const y = rect.y + height;
  const h = rect.height - height;

  return Object.assign({}, rect, { y, height: h });
};

export default crop;
