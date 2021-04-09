import * as R from 'ramda';

/**
 * Checks if number is between two values (upper non-inclusive)
 *
 * @param  {any}  value
 * @param  {Array}  list
 * @return {number} appearances of value in list
 */
const count = (value, list) =>
  R.compose(R.length, R.filter(R.equals(value)))(list);

export default R.curryN(2, count);
