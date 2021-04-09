import * as R from 'ramda';

import runIndexAt from './runIndexAt';

/**
 * Get run at char index
 *
 * @param  {number}  char index
 * @param  {Object}  attributedString
 * @return {Object} run
 */
const runAt = (n, attributedString) => {
  const runIndex = runIndexAt(n)(attributedString);
  return R.path(['runs', runIndex])(attributedString);
};

export default R.curryN(2, runAt);
