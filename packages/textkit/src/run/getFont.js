import * as R from 'ramda';

/**
 * Get run font
 *
 * @param  {Object}  run
 * @return {Object} font
 */
const getFont = R.pathOr(null, ['attributes', 'font']);

export default getFont;
