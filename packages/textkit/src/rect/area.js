import * as R from 'ramda';

/**
 * Returns rect area
 *
 * @param  {Object}  rect
 * @return {number} rect area
 */
const area = R.converge(R.multiply, [
  R.propOr(0, 'height'),
  R.propOr(0, 'width'),
]);

export default area;
