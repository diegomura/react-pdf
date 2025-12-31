import isRunWhiteSpace from '../run/isWhiteSpace';
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

  let offset = 0;

  for (let i = runs.length - 1; i >= 0; i -= 1) {
    const run = runs[i];

    offset += runTrailingOffset(run);

    if (!isRunWhiteSpace(run)) break;
  }

  return offset;
};

export default trailingOffset;
