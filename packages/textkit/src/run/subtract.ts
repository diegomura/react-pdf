import { Run } from '../types';

/**
 * Subtract scalar to run
 *
 * @param index - Scalar
 * @param run - Run
 * @returns Subtracted run
 */
const subtract = (index: number, run: Run): Run => {
  const start = run.start - index;
  const end = run.end - index;

  return Object.assign({}, run, { start, end });
};

export default subtract;
