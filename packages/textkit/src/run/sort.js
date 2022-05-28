/**
 * Sort runs in ascending order
 *
 * @param  {Array}  runs
 * @return {Array} sorted runs
 */
const sort = runs => runs.sort((a, b) => a.start - b.start || a.end - b.end);

export default sort;
