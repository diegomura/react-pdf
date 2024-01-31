/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Sort runs in ascending order
 *
 * @param {Run[]} runs
 * @returns {Run[]} sorted runs
 */
export default function sort(runs) {
  return runs.sort((a, b) => a.start - b.start || a.end - b.end);
}
