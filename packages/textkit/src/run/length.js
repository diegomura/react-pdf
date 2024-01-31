/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run length
 *
 * @param {Run} run run
 * @returns {number} length
 */
export default function length(run) {
  return run.end - run.start;
}
