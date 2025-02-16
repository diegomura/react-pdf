import runHeight from '../run/height';
import { AttributedString, Run } from '../types';

/**
 * Returns attributed string height
 *
 * @param attributedString - Attributed string
 * @returns Height
 */
const height = (attributedString: AttributedString) => {
  const reducer = (acc: number, run: Run) => Math.max(acc, runHeight(run));
  return attributedString.runs.reduce(reducer, 0);
};

export default height;
