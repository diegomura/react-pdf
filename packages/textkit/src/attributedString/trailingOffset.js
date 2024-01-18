import { last } from '@react-pdf/fns';

import runTrailingOffset from '../run/trailingOffset';

/**
 * Get attributed string trailing white space offset
 *
 * @param {Object} attributedString attributed string
 * @returns {number} trailing white space offset
 */
const trailingOffset = attributedString => {
  const runs = attributedString.runs || [];

  return runTrailingOffset(last(runs));
};

export default trailingOffset;
