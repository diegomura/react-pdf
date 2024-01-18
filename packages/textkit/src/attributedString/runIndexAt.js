import runIndexAtInternal from '../run/runIndexAt';

/**
 * Get run index at char index
 *
 * @param {number} n char index
 * @param {Object} string attributed string
 * @returns {number} run index
 */
const runIndexAt = (n, string) => {
  return runIndexAtInternal(n, string.runs);
};

export default runIndexAt;
