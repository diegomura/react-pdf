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
  return attributedString.runs.reduce((acc, run) => {
    if (run.start < end && start <= run.end) {
      return acc + runAdvanceWidthBetween(start, end, run);
    }
    return acc;
  }, 0);
};

export default advanceWidthBetween;
