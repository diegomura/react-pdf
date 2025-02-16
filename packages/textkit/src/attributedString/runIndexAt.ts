import runIndexAtInternal from '../run/runIndexAt';
import { AttributedString } from '../types';

/**
 * Get run index at char index
 *
 * @param index - Char index
 * @param attributedString - Attributed string
 * @returns Run index
 */
const runIndexAt = (index: number, attributedString: AttributedString) => {
  return runIndexAtInternal(index, attributedString.runs);
};

export default runIndexAt;
