import runAt from './runAt';
import glyphIndexAt from '../run/glyphIndexAt';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get glyph width at string index
 *
 * @param {number} index string index
 * @param {AttributedString} string attributed string
 * @returns {number} glyph width
 */
const glyphWidthAt = (index, string) => {
  const run = runAt(index, string);
  const glyphIndex = glyphIndexAt(index, run);
  return run.positions[glyphIndex].xAdvance;
};

export default glyphWidthAt;
