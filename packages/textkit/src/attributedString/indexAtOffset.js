import runLength from '../run/length';
import runAdvanceWidth from '../run/advanceWidth';
import runIndexAtOffset from '../run/indexAtOffset';

/**
 * Get string index at offset
 *
 * @param {number} offset offset
 * @param {Object} string attributed string
 * @returns {number} string index at offset N
 */
const indexAtOffset = (offset, string) => {
  let index = 0;
  let counter = 0;

  const runs = string.runs || [];

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
