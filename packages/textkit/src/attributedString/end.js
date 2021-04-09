import * as R from 'ramda';

/**
 * Get attributed string end value
 *
 * @param  {Object}  glyph string
 * @return {number} end
 */
const end = R.ifElse(
  R.pathEq(['runs', 'length'], 0),
  R.always(0),
  R.compose(R.prop('end'), R.last, R.prop('runs')),
);

export default end;
