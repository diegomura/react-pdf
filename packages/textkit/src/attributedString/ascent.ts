import runAscent from '../run/ascent';
import { AttributedString, Run } from '../types';

/**
 * Returns attributed string ascent
 *
 * @param attributedString - Attributed string
 * @returns Ascent
 */
const ascent = (attributedString: AttributedString) => {
  const reducer = (acc, run: Run) => Math.max(acc, runAscent(run));
  return attributedString.runs.reduce(reducer, 0);
};

export default ascent;
