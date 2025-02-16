import { isNil, last } from '@react-pdf/fns';

/**
 * Append glyph indices with given length
 *
 * Ex. appendIndices(3, [0, 1, 2, 2]) => [0, 1, 2, 2, 3, 3, 3]
 *
 * @param length - Length
 * @param indices - Glyph indices
 * @returns Extended glyph indices
 */
const appendIndices = (length: number, indices: number[]) => {
  const lastIndex = last(indices);
  const value = isNil(lastIndex) ? 0 : lastIndex + 1;
  const newIndices = Array(length).fill(value);

  return indices.concat(newIndices);
};

export default appendIndices;
