import * as R from 'ramda';

import scale from './scale';

const getFontDescent = R.ifElse(
  R.has('attributes'),
  R.pathOr(0, ['attributes', 'font', 'descent']),
  R.always(0),
);

/**
 * Get run descent
 *
 * @param  {Object}  run
 * @return {number} descent
 */
const descent = R.converge(R.multiply, [scale, getFontDescent]);

export default descent;
