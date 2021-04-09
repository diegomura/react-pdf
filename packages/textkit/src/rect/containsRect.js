import * as R from 'ramda';

import maxX from './maxX';
import maxY from './maxY';

/**
 * Checks if rect b can be fitted inside A
 *
 * @param  {Object}  rect A
 * @param  {Object}  rect B
 * @return {Boolean} contains
 */
const containsRect = (rectA, rectB) => {
  const rectAX = R.propOr(0, 'x', rectA);
  const rectBX = R.propOr(0, 'x', rectB);
  const rectAY = R.propOr(0, 'y', rectA);
  const rectBY = R.propOr(0, 'y', rectB);
  const rectAMaxX = maxX(rectA);
  const rectAMaxY = maxY(rectA);
  const rectBMaxX = maxX(rectB);
  const rectBMaxY = maxY(rectB);

  return (
    rectAX <= rectBX &&
    rectAY <= rectBY &&
    rectAMaxX >= rectBMaxX &&
    rectAMaxY >= rectBMaxY
  );
};

export default R.curryN(2, containsRect);
