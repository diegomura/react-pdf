/**
 * Is run empty (start === end)
 *
 * @param {Object}  run
 * @returns {Object} is run empty
 */
const isEmpty = (run) => {
  return run.start === run.end;
};

export default isEmpty;
