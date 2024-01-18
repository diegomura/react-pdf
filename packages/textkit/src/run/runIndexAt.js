/**
 * Get run index that contains passed index
 *
 * @param {number} n index
 * @param {{ start: number, end: number }[]} runs array
 * @returns {number} run index
 */
const runIndexAt = (n, runs) => {
  if (!runs) return -1;

  return runs.findIndex((run) => run.start <= n && n < run.end);
};

export default runIndexAt;
