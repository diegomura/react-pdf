import { isNil } from '@nutshelllabs-pdf/fns';

/**
 * Return glyph index at string index, if glyph indices present.
 * Otherwise return string index
 *
 * @param  {number}  string index
 * @param  {Object}  run
 * @return {number}  glyph index
 */
const glyphIndexAt = (index, run) => {
  const result = run?.glyphIndices?.[index];
  return isNil(result) ? index : result;
};

export default glyphIndexAt;
