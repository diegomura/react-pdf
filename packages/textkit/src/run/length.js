/**
 * Get run length
 *
 * @param  {Object}  run
 * @return {number} length
 */
const length = run => {
  return run.end - run.start;
};

export default length;
