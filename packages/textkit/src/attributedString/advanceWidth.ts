import runAdvanceWidth from '../run/advanceWidth';
import { AttributedString, Run } from '../types';

/**
 * Returns attributed string advancewidth
 *
 * @param attributedString - Attributed string
 * @returns Advance width
 */
const advanceWidth = (attributedString: AttributedString) => {
  const reducer = (acc: number, run: Run) => acc + runAdvanceWidth(run);
  return attributedString.runs.reduce(reducer, 0);
};

export default advanceWidth;
