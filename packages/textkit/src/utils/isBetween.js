import * as R from 'ramda';

/**
 * Checks if number is between two values (upper non-inclusive)
 *
 * @param  {Function}  lower value
 * @param  {Function}  higher value
 * @param  {number}  predicate value
 * @return {Function} is between invoker
 */
const isBetween = (a, b, c) => R.both(R.o(R.gte(c), a), R.o(R.lt(c), b));

export default R.curryN(3, isBetween);
