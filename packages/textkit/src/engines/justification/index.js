/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */

import getFactors from './getFactors';
import getDistances from './getDistances';
import advanceWidth from '../../attributedString/advanceWidth';

/**
 * Adjust run positions by given distances
 *
 * @param {number[]} distances
 * @param {Object} line
 * @returns {Object} line
 */
const justifyLine = (distances, line) => {
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
 * // TODO: Make it immutable
 *
 * @param {Object} options layout options
 */
const justification = (options) => {
  /**
   * @param {Object} line
   * @returns {Object} line
   */
  return (line) => {
    const gap = line.box.width - advanceWidth(line);

    if (gap === 0) return; // Exact fit

    const factors = getFactors(gap, line, options);
    const distances = getDistances(gap, factors);

    return justifyLine(distances, line);
  };
};

export default justification;
