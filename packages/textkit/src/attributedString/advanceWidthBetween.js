import filterRuns from '../run/filter';
import runAdvanceWidthBetween from '../run/advanceWidthBetween';

/**
 * Advance width between start and end
 * Does not consider ligature splitting for the moment.
 * Check performance impact on supporting this
 *
 * @param  {number}  start offset
 * @param  {number}  end offset
 * @param  {Object}  attributedString
 * @return {number} advance width
 */
const advanceWidthBetween = (start, end, attributedString) => {
  const runs = filterRuns(start, end, attributedString.runs);
  return runs.reduce(
    (acc, run) => acc + runAdvanceWidthBetween(start, end, run),
    0,
  );
};

export default advanceWidthBetween;
