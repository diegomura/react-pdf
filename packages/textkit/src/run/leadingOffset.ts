import isWhiteSpace from '../glyph/isWhiteSpace';
import { Run } from '../types';

/**
 * Get white space leading positions
 *
 * @param run - Run
 * @returns White space leading positions
 */
const leadingPositions = (run: Run) => {
  const glyphs = run.glyphs || [];
  const positions = run.positions || [];
  const leadingWhitespaces = glyphs.findIndex((g) => !isWhiteSpace(g));

  return leadingWhitespaces === -1
    ? positions
    : positions.slice(0, leadingWhitespaces);
};

/**
 * Get run leading white space offset
 *
 * @param run - Run
 * @returns Leading white space offset
 */
const leadingOffset = (run: Run) => {
  if (!run) return 0;

  const positions = leadingPositions(run);

  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};

export default leadingOffset;
