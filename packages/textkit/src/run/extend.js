import * as R from 'ramda';

/**
 * Extends a run by given value
 *
 * @param  {number}  value
 * @param  {Object}  run
 * @return {boolean} extended run
 */
const extend = n =>
  R.evolve({
    start: R.min(n),
    end: R.max(n),
  });

export default extend;
