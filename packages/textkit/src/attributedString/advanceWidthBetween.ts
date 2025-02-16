import filterRuns from '../run/filter';
import runAdvanceWidthBetween from '../run/advanceWidthBetween';
import { AttributedString } from '../types';

/**
 * Advance width between start and end
 * Does not consider ligature splitting for the moment.
 * Check performance impact on supporting this
 *
 * @param start - Start offset
 * @param end - End offset
 * @param attributedString
 * @returns Advance width
 */
const advanceWidthBetween = (
  start: number,
  end: number,
  attributedString: AttributedString,
) => {
  const runs = filterRuns(start, end, attributedString.runs);
  return runs.reduce(
    (acc, run) => acc + runAdvanceWidthBetween(start, end, run),
    0,
  );
};

export default advanceWidthBetween;
