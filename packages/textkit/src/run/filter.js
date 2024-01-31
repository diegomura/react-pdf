import runIndexAt from './runIndexAt';

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Filter runs contained between start and end
 *
 * @param {number} start
 * @param {number} end
 * @param {Run[]} runs
 * @returns {Run[]} filtered runs
 */
export default function filter(start, end, runs) {
  const startIndex = runIndexAt(start, runs);
  const endIndex = Math.max(runIndexAt(end - 1, runs), startIndex);

  return runs.slice(startIndex, endIndex + 1);
}
