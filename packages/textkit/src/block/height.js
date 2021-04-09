import * as R from 'ramda';

/**
 * Get paragrpah block height
 *
 * @param  {Object}  paragraph block
 * @return {number} paragraph block height
 */
const height = R.compose(R.sum, R.map(R.prop('height')), R.pluck('box'));

export default height;
