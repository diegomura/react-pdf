/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Is run empty (start === end)
 *
 * @param {Run} run run
 * @returns {boolean} is run empty
 */
const isEmpty = (run) => {
  return run.start === run.end;
};

export default isEmpty;
