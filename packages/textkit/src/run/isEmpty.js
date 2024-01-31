/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Is run empty (start === end)
 *
 * @param {Run} run run
 * @returns {boolean} is run empty
 */
export default function isEmpty(run) {
  return run.start === run.end;
}
