import getFactors from './getFactors';
import getDistances from './getDistances';
import advanceWidth from '../../attributedString/advanceWidth';
import { AttributedString, LayoutOptions } from '../../types';

/**
 * Adjust run positions by given distances
 *
 * @param distances
 * @param line
 * @returns Line
 */
const justifyLine = (distances: number[], line: AttributedString) => {
  let index = 0;
  for (const run of line.runs) {
    for (const position of run.positions) {
      position.xAdvance += distances[index++];
    }
  }

  return line;
};

/**
 * A JustificationEngine is used by a Typesetter to perform line fragment
 * justification. This implementation is based on a description of Apple's
 * justification algorithm from a PDF in the Apple Font Tools package.
 *
 * @param options - Layout options
 */
const justification = (options: LayoutOptions) => {
  /**
   * @param line
   * @returns Line
   */
  return (line: AttributedString) => {
    const gap = line.box.width - advanceWidth(line);

    if (gap === 0) return line; // Exact fit

    const factors = getFactors(gap, line, options);
    const distances = getDistances(gap, factors);

    return justifyLine(distances, line);
  };
};

export default justification;
