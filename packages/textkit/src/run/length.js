import * as R from 'ramda';

/**
 * Get run length
 *
 * @param  {Object}  run
 * @return {number} length
 */
const length = R.converge(R.subtract, [R.prop('end'), R.prop('start')]);

export default length;
