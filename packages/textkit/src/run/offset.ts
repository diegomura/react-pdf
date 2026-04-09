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

  return stringIndices.slice(0, index).filter((i) => i === value).length;
};

export default offset;
