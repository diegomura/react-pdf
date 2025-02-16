import runDescent from '../run/descent';
import { AttributedString, Run } from '../types';

/**
 * Returns attributed string descent
 *
 * @param attributedString - Attributed string
 * @returns Descent
 */
const descent = (attributedString: AttributedString) => {
  const reducer = (acc: number, run: Run) => Math.min(acc, runDescent(run));
  return attributedString.runs.reduce(reducer, 0);
};

export default descent;
