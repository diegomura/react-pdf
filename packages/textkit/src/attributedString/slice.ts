import sliceRun from '../run/slice';
import filterRuns from '../run/filter';
import subtractRun from '../run/subtract';
import { AttributedString, Run } from '../types';

/**
 * Slice array of runs
 *
 * @param start - Offset
 * @param end - Offset
 * @param runs
 * @returns Sliced runs
 */
const sliceRuns = (start: number, end: number, runs: Run[]) => {
  const sliceFirstRun = (a) => sliceRun(start - a.start, end - a.start, a);
  const sliceLastRun = (a) => sliceRun(0, end - a.start, a);

  return runs.map((run, i) => {
    let result = run;

    const isFirst = i === 0;
    const isLast = !isFirst && i === runs.length - 1;

    if (isFirst) result = sliceFirstRun(run);
    if (isLast) result = sliceLastRun(run);

    return subtractRun(start, result);
  });
};

/**
 * Slice attributed string between two indices
 *
 * @param start - Offset
 * @param end - Offset
 * @param attributedString - Attributed string
 * @returns Attributed string
 */
const slice = (
  start: number,
  end: number,
  attributedString: AttributedString,
): AttributedString => {
  if (attributedString.string.length === 0) return attributedString;

  const string = attributedString.string.slice(start, end);
  const filteredRuns = filterRuns(start, end, attributedString.runs);
  const slicedRuns = sliceRuns(start, end, filteredRuns);

  return Object.assign({}, attributedString, { string, runs: slicedRuns });
};

export default slice;
