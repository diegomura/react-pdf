/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Add scalar to run
 *
 * @param {number} n scalar
 * @param {Run} run run
 * @returns {Run} added run
 */
const add = (n, run) => {
  const start = run.start + n;
  const end = run.end + n;

  return Object.assign({}, run, { start, end });
};

export default add;
