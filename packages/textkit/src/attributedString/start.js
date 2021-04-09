import * as R from 'ramda';

/**
 * Get attributed string start value
 *
 * @param  {Object}  glyph string
 * @return {number} start
 */
const start = R.ifElse(
  R.pathEq(['runs', 'length'], 0),
  R.always(0),
  R.path(['runs', 0, 'start']),
);

export default start;
