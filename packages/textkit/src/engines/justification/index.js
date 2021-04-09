/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */

import * as R from 'ramda';

import getFactors from './getFactors';
import getDistances from './getDistances';
import advanceWidth from '../../attributedString/advanceWidth';

/**
 * Adjust run positions by given distances
 *
 * @param {Array} distances
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
 * //TODO: Make it immutable
 *
 * @param {Object} layout options
 * @param {Object} line
 * @returns {Object} line
 */
const justification = (options, line) => {
  const gap = line.box.width - advanceWidth(line);

  if (gap === 0) return; // Exact fit

  const factors = getFactors(gap, line, options);
  const distances = getDistances(gap, factors);

  return justifyLine(distances, line);
};

export default R.curryN(2, justification);
