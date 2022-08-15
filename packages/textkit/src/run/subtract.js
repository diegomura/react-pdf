/**
 * Subtract scalar to run
 *
 * @param  {number}  scalar
 * @param  {Object}  run
 * @return {Object} subtracted run
 */
const subtract = (n, run) => {
  const start = run.start - n;
  const end = run.end - n;

  return Object.assign({}, run, { start, end });
};

export default subtract;
