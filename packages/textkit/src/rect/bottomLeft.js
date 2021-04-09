import * as R from 'ramda';

import maxY from './maxY';

/**
 * Returns rect bottom left point
 *
 * @param  {Object}  rect
 * @return {number} bottom left point
 */
const bottomLeft = R.applySpec({
  x: R.propOr(0, 'x'),
  y: maxY,
});

export default bottomLeft;
