import * as R from 'ramda';

/**
 * Omit attribute from run
 *
 * @param  {Object}  run
 * @return {Object} run without ommited attribute
 */
const omit = (value, run) =>
  R.evolve({
    attributes: R.dissoc(value),
  })(run);

export default R.curryN(2, omit);
