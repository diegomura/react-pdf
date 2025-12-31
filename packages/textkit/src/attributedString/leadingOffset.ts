import isWhiteSpace from '../glyph/isWhiteSpace';
import runLeadingOffset from '../run/leadingOffset';
import { AttributedString, Run } from '../types';

/**
 * Check if run is entirely whitespace
 *
 * @param run - Run
 * @returns Whether run is entirely whitespace
 */
const isRunWhiteSpace = (run: Run) => {
  const glyphs = run?.glyphs || [];

  return glyphs.length > 0 && glyphs.every(isWhiteSpace);
};

/**
 * Get attributed string leading white space offset
 *
 * @param attributedString - Attributed string
 * @returns Leading white space offset
 */
const leadingOffset = (attributedString: AttributedString) => {
  const runs = attributedString.runs || [];

  let offset = 0;

  for (const run of runs) {
    offset += runLeadingOffset(run);

    if (!isRunWhiteSpace(run)) break;
  }

  return offset;
};

export default leadingOffset;
