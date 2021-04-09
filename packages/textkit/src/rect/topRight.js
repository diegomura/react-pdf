import * as R from 'ramda';

import maxX from './maxX';

/**
 * Returns rect top right point
 *
 * @param  {Object}  rect
 * @return {number} top right point
 */
const topRight = R.applySpec({
  x: maxX,
  y: R.propOr(0, 'y'),
});

export default topRight;
