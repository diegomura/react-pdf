import * as R from 'ramda';

import maxX from './maxX';
import maxY from './maxY';

/**
 * Returns rect bottom right point
 *
 * @param  {Object}  rect
 * @return {number} bottom right point
 */
const bottomRight = R.applySpec({
  x: maxX,
  y: maxY,
});

export default bottomRight;
