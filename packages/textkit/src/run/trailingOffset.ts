import { reverse } from '@react-pdf/fns';
import isWhiteSpace from '../glyph/isWhiteSpace';
import { Run } from '../types';

/**
 * Get white space trailing positions
 *
 * @param run run
 * @returns White space trailing positions
 */
const trailingPositions = (run: Run) => {
  const glyphs = reverse(run.glyphs || []);
  const positions = reverse(run.positions || []);
  const leadingWhitespaces = glyphs.findIndex((g) => !isWhiteSpace(g));

  return leadingWhitespaces === -1
    ? positions
    : positions.slice(0, leadingWhitespaces);
};

/**
 * Get run trailing white space offset
 *
 * @param run - Run
 * @returns Trailing white space offset
 */
const trailingOffset = (run: Run) => {
  if (!run) return 0;

  const positions = trailingPositions(run);

  return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};

export default trailingOffset;
