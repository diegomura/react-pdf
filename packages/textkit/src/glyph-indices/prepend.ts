/**
 * Prepend a new glyph index entry to the beginning of the indices array.
 * Inserts a zero at the start and shifts all existing indices by the given length.
 * If length is zero, returns the original array unchanged.
 *
 * @param length - The number of character positions the prepended glyph occupies
 * @param indices - The existing glyph indices array
 * @returns New array with the prepended index
 */
const prepend = (length: number, indices: number[]): number[] => {
  if (length === 0) return indices;

  const result = [0];

  for (let i = 0; i < indices.length; i += 1) {
    result.push(indices[i] + length);
  }

  return result;
};

export default prepend;
