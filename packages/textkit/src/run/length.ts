import { Run } from '../types';

/**
 * Get run length
 *
 * @param run - Run
 * @returns Length
 */
const length = (run: Run) => {
  return run.end - run.start;
};

export default length;
