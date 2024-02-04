/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Sort runs in ascending order
 *
 * @param {Run[]} runs
 * @returns {Run[]} sorted runs
 */
const sort = (runs) => {
  return runs.sort((a, b) => a.start - b.start || a.end - b.end);
};

export default sort;
