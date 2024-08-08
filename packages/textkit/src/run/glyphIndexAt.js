import { isNil } from '@react-pdf/fns';

/**
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Return glyph index at string index, if glyph indices present.
 * Otherwise return string index
 *
 * @param {number} index index
 * @param {Run} run run
 * @returns {number} glyph index
 */
const glyphIndexAt = (index, run) => {
  const result = run?.glyphIndices?.[index];
  return isNil(result) ? index : result;
};

export default glyphIndexAt;
