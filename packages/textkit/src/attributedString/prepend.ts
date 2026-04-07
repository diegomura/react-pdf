import add from '../run/add';
import emptyRun from '../run/empty';
import prependToRun from '../run/prepend';
import { AttributedString, Glyph, Run } from '../types';
import stringFromCodePoints from '../utils/stringFromCodePoints';

/**
 * Prepend glyph into first run of attributed string
 *
 * @param glyph - Glyph to prepend
 * @param attributedString - Attributed string
 * @returns Attributed string with new glyph
 */
const prepend = (
  glyph: Glyph | null,
  attributedString: AttributedString,
): AttributedString => {
  const codePoints = glyph?.codePoints || [];
  const string = stringFromCodePoints(codePoints) + attributedString.string;

  const offset = codePoints.length;
  const { runs: existingRuns } = attributedString;
  const firstRun = existingRuns[0] || emptyRun();

  // Build new runs array: prepend to first run, offset remaining runs
  const runs: Run[] = [prependToRun(glyph, firstRun)];
  for (let i = 1; i < existingRuns.length; i += 1) {
    runs.push(add(offset, existingRuns[i]));
  }

  return { ...attributedString, runs, string };
};

export default prepend;
