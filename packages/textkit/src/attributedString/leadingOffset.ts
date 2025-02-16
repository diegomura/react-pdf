import runLeadingOffset from '../run/leadingOffset';
import { AttributedString } from '../types';

/**
 * Get attributed string leading white space offset
 *
 * @param attributedString - Attributed string
 * @returns Leading white space offset
 */
const leadingOffset = (attributedString: AttributedString) => {
  const runs = attributedString.runs || [];

  return runLeadingOffset(runs[0]);
};

export default leadingOffset;
