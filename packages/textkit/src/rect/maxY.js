/**
 * Returns max rect Y coordinate
 *
 * @param  {Object}  rect
 * @return {number} y coordinate
 */
const maxY = rect => {
  return rect ? rect.y + rect.height : 0;
};

export default maxY;
