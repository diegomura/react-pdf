/**
 * Get run index that contains passed index
 *
 * @param  {number}  char index
 * @param  {Array}  runs array
 * @return {Array} run index
 */
const runIndexAt = (n, runs) => {
  if (!runs) return -1;

  return runs.findIndex(run => run.start <= n && n < run.end);
};

export default runIndexAt;
