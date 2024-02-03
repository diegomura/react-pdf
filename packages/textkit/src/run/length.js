/**
 * Get run length
 *
 * @param {Object}  run
 * @returns {number} length
 */
const length = (run) => {
  return run.end - run.start;
};

export default length;
