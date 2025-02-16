import { Run } from '../types';

/**
 * Is run empty (start === end)
 *
 * @param run - Run
 * @returns Is run empty
 */
const isEmpty = (run: Run) => {
  return run.start === run.end;
};

export default isEmpty;
