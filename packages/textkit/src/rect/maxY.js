import * as R from 'ramda';

/**
 * Returns max rect Y coordinate
 *
 * @param  {Object}  rect
 * @return {number} y coordinate
 */
const maxY = R.converge(R.add, [R.propOr(0, 'y'), R.propOr(0, 'height')]);

export default maxY;
