import { Run } from '../types';

/**
 * Get ligature offset by index
 *
 * Ex. ffi ligature
 *
 *   glyphs:         l  o  f  f  i  m
 *   stringIndices:   0  1  2  2  2  3
 *   offset:         0  0  0  1  2  0
 *
 * @param index
 * @param run - Run
 * @returns Ligature offset
 */
const offset = (index: number, run: Run) => {
  if (!run) return 0;

  const stringIndices = run.stringIndices || [];
  const value = stringIndices[index];

  if (value === undefined) return 0;

  let result = 0;

  for (let i = index - 1; i >= 0 && stringIndices[i] === value; i -= 1) {
    result += 1;
  }

  return result;
};

export default offset;
