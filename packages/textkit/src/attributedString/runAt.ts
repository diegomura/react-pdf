import { AttributedString } from '../types';
import runIndexAt from './runIndexAt';

/**
 * Get run at char index
 *
 * @param index - Char index
 * @param attributedString - Attributed string
 * @returns Run
 */
const runAt = (index: number, attributedString: AttributedString) => {
  const runIndex = runIndexAt(index, attributedString);
  return attributedString.runs[runIndex];
};

export default runAt;
