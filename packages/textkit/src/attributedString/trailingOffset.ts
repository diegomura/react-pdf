import { last } from '@react-pdf/fns';

import runTrailingOffset from '../run/trailingOffset';
import { AttributedString } from '../types';

/**
 * Get attributed string trailing white space offset
 *
 * @param attributedString - Attributed string
 * @returns Trailing white space offset
 */
const trailingOffset = (attributedString: AttributedString) => {
  const runs = attributedString.runs || [];

  return runTrailingOffset(last(runs));
};

export default trailingOffset;
