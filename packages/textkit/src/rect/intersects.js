import * as R from 'ramda';

/**
 * Checks if two rect intersects
 *
 * @param  {Object}  rect A
 * @param  {Object}  rect B
 * @return {Boolean} rects intersect
 */
const intersects = (rectA, rectB) => {
  const rectAX = R.propOr(0, 'x', rectA);
  const rectBX = R.propOr(0, 'x', rectB);
  const rectAY = R.propOr(0, 'y', rectA);
  const rectBY = R.propOr(0, 'y', rectB);
  const rectAW = R.propOr(0, 'width', rectA);
  const rectBW = R.propOr(0, 'width', rectB);
  const rectAH = R.propOr(0, 'height', rectA);
  const rectBH = R.propOr(0, 'height', rectB);

  return (
    rectAX <= rectBX + rectBW &&
    rectBX <= rectAX + rectAW &&
    rectAY <= rectBY + rectBH &&
    rectBY <= rectAY + rectAH
  );
};

export default R.curryN(2, intersects);
