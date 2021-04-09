import * as R from 'ramda';

/**
 * Is run empty (start === end)
 *
 * @param  {Object}  run
 * @return {Object} is run empty
 */
const isEmpty = R.converge(R.equals, [R.prop('start'), R.prop('end')]);

export default isEmpty;
