import runIndexAt from './runIndexAt';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run at char index
 *
 * @param {number} n char index
 * @param {AttributedString} attributedString attributed string
 * @returns {Run} run
 */
const runAt = (n, attributedString) => {
  const runIndex = runIndexAt(n, attributedString);
  return attributedString.runs[runIndex];
};

export default runAt;
