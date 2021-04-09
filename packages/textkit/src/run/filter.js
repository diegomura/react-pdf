import * as R from 'ramda';

import runIndexAt from './runIndexAt';

/**
 * Filter runs contained between start and end
 *
 * @param  {number}  start
 * @param  {number}  end
 * @param  {Array}  runs
 * @return {boolean} filtered runs
 */
const filter = (start, end, runs) => {
  const startIndex = runIndexAt(start, runs);
  const endIndex = R.max(runIndexAt(end - 1, runs), startIndex);

  return R.slice(startIndex, endIndex + 1, runs);
};

export default R.curryN(3, filter);
