import { Run } from '../types';
import runIndexAt from './runIndexAt';

/**
 * Filter runs contained between start and end
 *
 * @param start
 * @param end
 * @param runs
 * @returns Filtered runs
 */
const filter = (start: number, end: number, runs: Run[]) => {
  const startIndex = runIndexAt(start, runs);
  const endIndex = Math.max(runIndexAt(end - 1, runs), startIndex);

  return runs.slice(startIndex, endIndex + 1);
};

export default filter;
