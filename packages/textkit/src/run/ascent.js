import * as R from 'ramda';

import scale from './scale';

const getFontAscent = R.ifElse(
  R.has('attributes'),
  R.pathOr(0, ['attributes', 'font', 'ascent']),
  R.always(0),
);

/**
 * Get run ascent
 *
 * @param  {Object}  run
 * @return {boolean} ascent
 */
const ascent = R.converge(R.max, [
  R.pathOr(0, ['attributes', 'attachment', 'height']),
  R.converge(R.multiply, [scale, getFontAscent]),
]);

export default ascent;
