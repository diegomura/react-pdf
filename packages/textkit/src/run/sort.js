/**
 * Sort runs in ascending order
 *
 * @template {{ start: number, end: number }} T
 * @param {T[]} runs
 * @returns {T[]} sorted runs
 */
const sort = (runs) => runs.sort((a, b) => a.start - b.start || a.end - b.end);

export default sort;
