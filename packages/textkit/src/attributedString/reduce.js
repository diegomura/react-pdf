import * as R from 'ramda';

/**
 * Sum run function results
 *
 * @param {function} accum fn
 * @param {function} function run (run) -> Number
 * @param {number} initial value
 * @return {number} sum
 */
const sumRuns = (accum, fn, init = 0) =>
  R.compose(R.reduce(R.useWith(accum, [R.identity, fn]), init), R.prop('runs'));

export default sumRuns;
