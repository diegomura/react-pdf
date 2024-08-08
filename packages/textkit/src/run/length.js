/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get run length
 *
 * @param {Run} run run
 * @returns {number} length
 */
const length = (run) => {
  return run.end - run.start;
};

export default length;
