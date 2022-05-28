/**
 * Prepend glyph indices with given length
 *
 * Ex. prepend(3, [0, 1, 2, 2]) => [0, 0, 0, 1, 2, 3, 3]
 *
 * @param  {number}  length
 * @param  {Array}  glyph indices
 * @return {Array}  extended glyph indices
 */
const prepend = (length, indices) => {
  if (length === 0) return indices;

  const newIndices = Array(length).fill(0);
  const lastIndices = indices.map(value => value + 1);

  return newIndices.concat(lastIndices);
};

export default prepend;
