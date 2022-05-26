/**
 * Checks if number is between two values (upper non-inclusive)
 *
 * @param  {Function}  lower value
 * @param  {Function}  higher value
 * @param  {number}  predicate value
 * @return {Function} is between invoker
 */
const isBetween = (a, b, c) => (...args) => {
  return a(...args) <= c && c < b(...args);
};

export default isBetween;
