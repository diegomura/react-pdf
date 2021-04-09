import * as R from 'ramda';

/**
 * Add scalar to run
 *
 * @param  {number}  scalar
 * @param  {Object}  run
 * @return {Object} added run
 */
const add = (n, run) =>
  R.evolve({
    start: R.add(n),
    end: R.add(n),
  })(run);

export default R.curryN(2, add);
