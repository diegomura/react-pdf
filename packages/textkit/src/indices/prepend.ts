/**
 * Prepend glyph indices with given length
 *
 * Ex. prepend(3, [0, 1, 2, 2]) => [0, 0, 0, 1, 2, 3, 3]
 *
 * @param length - Length
 * @param indices - Glyph indices
 * @returns Extended glyph indices
 */
const prepend = (length: number, indices: number[]) => {
  if (length === 0) return indices;

  const newIndices = Array(length).fill(0);
  const lastIndices = indices.map((value) => value + 1);

  return newIndices.concat(lastIndices);
};

export default prepend;
