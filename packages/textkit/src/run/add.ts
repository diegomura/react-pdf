import { Run } from '../types';

/**
 * Add scalar to run
 *
 * @param index - Scalar
 * @param run - Run
 * @returns Added run
 */
const add = (index: number, run: Run): Run => {
  const start = run.start + index;
  const end = run.end + index;

  return Object.assign({}, run, { start, end });
};

export default add;
