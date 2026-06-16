/**
 * Prepend glyph indices with given length
 *
 * Ex. prepend(3, [0, 1, 2, 2]) => [0, 0, 0, 1, 2, 3, 3]
 *
 * @param length - Length to prepend
 * @param indices - Glyph indices
 * @returns Extended glyph indices
 */
const prepend = (length: number, indices: number[]): number[] => {
  if (length === 0) return indices;

  const result = Array<number>(length).fill(0);

  for (let i = 0; i < indices.length; i += 1) {
    result.push(indices[i] + 1);
  }

  return result;
};

export default prepend;
