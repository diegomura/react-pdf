import * as R from 'ramda';

import maxX from './maxX';
import maxY from './maxY';

/**
 * Checks if point is inside rect
 *
 * @param  {Object}  rect
 * @param  {Object}  point
 * @return {Boolean} contains
 */
const containsPoint = (rectA, point) => {
  const rectX = R.propOr(0, 'x', rectA);
  const rectY = R.propOr(0, 'y', rectA);
  const rectMaxX = maxX(rectA);
  const rectMaxY = maxY(rectA);
  const pointX = R.propOr(0, 'x', point);
  const pointY = R.propOr(0, 'y', point);

  return (
    rectX <= pointX &&
    rectY <= pointY &&
    rectMaxX >= pointX &&
    rectMaxY >= pointY
  );
};

export default R.curryN(2, containsPoint);
