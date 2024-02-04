/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Get ligature offset by index
 *
 * Ex. ffi ligature
 *
 *   glyphs:         l  o  f  f  i  m
 *   glyphIndices:   0  1  2  2  2  3
 *   offset:         0  0  0  1  2  0
 *
 * @param {number} index
 * @param {Run} run run
 * @returns {number} ligature offset
 */
const offset = (index, run) => {
  if (!run) return 0;

  const glyphIndices = run.glyphIndices || [];
  const value = glyphIndices[index];

  return glyphIndices.slice(0, index).filter((i) => i === value).length;
};

export default offset;
