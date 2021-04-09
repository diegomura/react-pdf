import * as R from 'ramda';

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
const advanceWidthBetween = (start, end, string) =>
  R.compose(
    R.sum,
    R.map(runAdvanceWidthBetween(start, end)),
    filterRuns(start, end),
    R.propOr([], 'runs'),
  )(string);

export default R.curryN(3, advanceWidthBetween);
