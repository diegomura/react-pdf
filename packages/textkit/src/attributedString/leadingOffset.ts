import isRunWhiteSpace from '../run/isWhiteSpace';
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

  let offset = 0;

  for (const run of runs) {
    offset += runLeadingOffset(run);

    if (!isRunWhiteSpace(run)) break;
  }

  return offset;
};

export default leadingOffset;
