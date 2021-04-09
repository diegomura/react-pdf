import * as R from 'ramda';

/**
 * Sort runs in ascending order
 *
 * @param  {Array}  runs
 * @return {Array} sorted runs
 */
const sort = (a, b) => a.start - b.start || a.end - b.end;

export default R.sort(sort);
