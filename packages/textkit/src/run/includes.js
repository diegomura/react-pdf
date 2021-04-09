import * as R from 'ramda';

/**
 * Checks if run includes code point
 *
 * @param  {number}  code point
 * @param  {Object}  run
 * @return {Object} empty run
 */
const includes = (codePoint, run) =>
  R.compose(
    R.any(R.compose(R.includes(codePoint), R.propOr([], 'codePoints'))),
    R.propOr([], 'glyphs'),
  )(run);

export default R.curryN(2, includes);
