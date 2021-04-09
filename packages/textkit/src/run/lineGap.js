import * as R from 'ramda';

import scale from './scale';

/**
 * Get run lineGap
 *
 * @param  {Object}  run
 * @return {number} lineGap
 */
const lineGap = R.converge(R.multiply, [
  scale,
  R.pathOr(0, ['attributes', 'font', 'lineGap']),
]);

export default lineGap;
