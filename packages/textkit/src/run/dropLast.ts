import { Run } from '../types';
import slice from './slice';

/**
 * Drop last char of run
 *
 * @param run - Run
 * @returns Run without last char
 */
const dropLast = (run: Run) => {
  return slice(0, run.end - run.start - 1, run);
};

export default dropLast;
