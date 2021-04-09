import * as R from 'ramda';

/**
 * Returns rect top left point
 *
 * @param  {Object}  rect
 * @return {number} top left point
 */
const topLeft = R.applySpec({
  x: R.propOr(0, 'x'),
  y: R.propOr(0, 'y'),
});

export default topLeft;
