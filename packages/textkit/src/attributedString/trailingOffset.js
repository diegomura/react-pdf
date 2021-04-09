import * as R from 'ramda';

import runTrailingOffset from '../run/trailingOffset';

/**
 * Get attributed string trailing white space offset
 *
 * @param  {Object}  attributed string
 * @return {number} trailing white space offset
 */
const trailingOffset = R.compose(
  runTrailingOffset,
  R.last,
  R.propOr([], 'runs'),
);

export default trailingOffset;
