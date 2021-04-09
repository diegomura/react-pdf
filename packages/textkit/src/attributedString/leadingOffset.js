import * as R from 'ramda';

import runLeadingOffset from '../run/leadingOffset';

/**
 * Get attributed string leading white space offset
 *
 * @param  {Object}  attributed string
 * @return {number} leading white space offset
 */
const leadingOffset = R.compose(runLeadingOffset, R.head, R.propOr([], 'runs'));

export default leadingOffset;
