import sliceRun from '../run/slice';
import filterRuns from '../run/filter';
import subtractRun from '../run/subtract';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Slice array of runs
 *
 * @param {number} start offset
 * @param {number} end offset
 * @param {Run[]} runs
 * @returns {Run[]} sliced runs
 */
const sliceRuns = (start, end, runs) => {
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
 * @param {number} start offset
 * @param {number} end offset
 * @param {AttributedString} attributedString attributed string
 * @returns {AttributedString} attributed string
 */
const slice = (start, end, attributedString) => {
  if (attributedString.string.length === 0) return attributedString;

  const string = attributedString.string.slice(start, end);
  const filteredRuns = filterRuns(start, end, attributedString.runs);
  const slicedRuns = sliceRuns(start, end, filteredRuns);

  return Object.assign({}, attributedString, { string, runs: slicedRuns });
};

export default slice;
