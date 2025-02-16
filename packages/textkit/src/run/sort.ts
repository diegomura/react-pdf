import { Run } from '../types';

/**
 * Sort runs in ascending order
 *
 * @param runs
 * @returns Sorted runs
 */
const sort = (runs: Run[]) => {
  return runs.sort((a, b) => a.start - b.start || a.end - b.end);
};

export default sort;
