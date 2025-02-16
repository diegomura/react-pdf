import { Run } from '../types';

/**
 * Get run index that contains passed index
 *
 * @param index - Index
 * @param runs - Runs
 * @returns Run index
 */
const runIndexAt = (index: number, runs: Run[]) => {
  if (!runs) return -1;

  return runs.findIndex((run) => run.start <= index && index < run.end);
};

export default runIndexAt;
