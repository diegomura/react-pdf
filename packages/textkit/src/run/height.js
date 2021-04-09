import * as R from 'ramda';

import ascent from './ascent';
import descent from './descent';
import lineGap from './lineGap';

/**
 * Get run height
 *
 * @param  {Object}  run
 * @return {number} height
 */
const height = R.either(
  R.path(['attributes', 'lineHeight']),
  R.compose(R.sum, R.juxt([ascent, R.o(R.negate, descent), lineGap])),
);

export default height;
