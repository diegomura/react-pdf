import slice from './slice';

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Drop last char of run
 *
 * @param {Run} run run
 * @returns {Run} run without last char
 */
const dropLast = (run) => {
  return slice(0, run.end - run.start - 1, run);
};

export default dropLast;
