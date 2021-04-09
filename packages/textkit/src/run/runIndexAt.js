import * as R from 'ramda';

import isBetween from '../utils/isBetween';

/**
 * Get run index that contains passed index
 *
 * @param  {number}  char index
 * @param  {Array}  runs array
 * @return {Array} run index
 */
const runIndexAt = (n, runs) =>
  R.findIndex(isBetween(R.prop('start'), R.prop('end'), n))(runs);

export default R.curryN(2, runIndexAt);
