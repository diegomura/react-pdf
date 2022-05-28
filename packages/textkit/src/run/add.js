/**
 * Add scalar to run
 *
 * @param  {number}  scalar
 * @param  {Object}  run
 * @return {Object} added run
 */
const add = (n, run) => {
  const start = run.start + n;
  const end = run.end + n;

  return Object.assign({}, run, { start, end });
};

export default add;
