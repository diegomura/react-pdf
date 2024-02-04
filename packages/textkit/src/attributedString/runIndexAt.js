import runIndexAtInternal from '../run/runIndexAt';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get run index at char index
 *
 * @param {number} n char index
 * @param {AttributedString} string attributed string
 * @returns {number} run index
 */
const runIndexAt = (n, string) => {
  return runIndexAtInternal(n, string.runs);
};

export default runIndexAt;
