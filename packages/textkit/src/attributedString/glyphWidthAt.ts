import runAt from './runAt';
import glyphIndexAt from '../run/glyphIndexAt';
import { AttributedString } from '../types';

/**
 * Get glyph width at string index
 *
 * @param index - String index
 * @param attributedString - Attributed string
 * @returns Glyph width
 */
const glyphWidthAt = (index: number, attributedString: AttributedString) => {
  const run = runAt(index, attributedString);
  const glyphIndex = glyphIndexAt(index, run);
  return run.positions[glyphIndex].xAdvance;
};

export default glyphWidthAt;
