import * as R from 'ramda';

/**
 * Returns max rect X coordinate
 *
 * @param  {Object}  rect
 * @return {number} x coordinate
 */
const maxX = R.converge(R.add, [R.propOr(0, 'x'), R.propOr(0, 'width')]);

export default maxX;
