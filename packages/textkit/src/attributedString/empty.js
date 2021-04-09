import * as R from 'ramda';

/**
 * Returns empty attributed string
 *
 * @return {Object} empty attributed string
 */
const empty = R.always({ string: '', runs: [] });

export default empty;
