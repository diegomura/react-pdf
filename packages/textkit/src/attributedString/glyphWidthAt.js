import runAt from './runAt';
import glyphIndexAt from '../run/glyphIndexAt';

/**
 * Get glyph width at string index
 *
 * @param {number} string index
 * @param {Object} attributed string
 * @return {number} glyph width
 */
const glyphWidthAt = (index, string) => {
  const run = runAt(index, string);
  const glyphIndex = glyphIndexAt(index, run);
  return run.positions[glyphIndex].xAdvance;
};

export default glyphWidthAt;
