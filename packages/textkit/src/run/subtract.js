/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Subtract scalar to run
 *
 * @param {number} n scalar
 * @param {Run} run run
 * @returns {Object} subtracted run
 */
export default function subtract(n, run) {
  const start = run.start - n;
  const end = run.end - n;

  return Object.assign({}, run, { start, end });
}
