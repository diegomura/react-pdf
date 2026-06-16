/**
 * Append a new glyph index entry to the end of the indices array.
 * The appended value represents the character position of the new glyph,
 * which corresponds to the current string length.
 *
 * @param value - The current string length (character position of the new glyph)
 * @param indices - The existing glyph indices array
 * @returns New array with the appended index
 */
const appendIndices = (value: number, indices: number[]): number[] => {
  return indices.concat([value]);
};

export default appendIndices;
