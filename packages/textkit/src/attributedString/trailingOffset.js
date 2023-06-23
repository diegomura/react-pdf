import { last } from '@nutshelllabs/fns';

import runTrailingOffset from '../run/trailingOffset';

/**
 * Get attributed string trailing white space offset
 *
 * @param  {Object}  attributed string
 * @return {number} trailing white space offset
 */
const trailingOffset = attributedString => {
  const runs = attributedString.runs || [];

  return runTrailingOffset(last(runs));
};

export default trailingOffset;
