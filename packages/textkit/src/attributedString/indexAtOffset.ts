import runLength from '../run/length';
import runAdvanceWidth from '../run/advanceWidth';
import runIndexAtOffset from '../run/indexAtOffset';
import { AttributedString } from '../types';

/**
 * Get string index at offset
 *
 * @param offset - Offset
 * @param attributedString - Attributed string
 * @returns String index at offset N
 */
const indexAtOffset = (offset: number, attributedString: AttributedString) => {
  let index = 0;
  let counter = 0;

  const runs = attributedString.runs || [];

  for (let i = 0; i < runs.length; i += 1) {
    const run = runs[i];

    const advanceWidth = runAdvanceWidth(run);

    if (counter + advanceWidth > offset) {
      return index + runIndexAtOffset(offset - counter, run);
    }
    counter += advanceWidth;
    index += runLength(run);
  }

  return index;
};

export default indexAtOffset;
