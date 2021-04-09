import * as R from 'ramda';

import isWhiteSpace from '../glyph/isWhiteSpace';

/**
 * Get white space trailing positions
 *
 * @param  {Object}  run
 * @return {Array} white space trailing positions
 */
const trailingPositions = R.converge(R.slice(0), [
  R.compose(
    R.length,
    R.takeWhile(isWhiteSpace),
    R.reverse,
    R.propOr([], 'glyphs'),
  ),
  R.compose(R.reverse, R.propOr([], 'positions')),
]);

/**
 * Get run trailing white space offset
 *
 * @param  {Object}  run
 * @return {number} trailing white space offset
 */
const trailingOffset = R.compose(
  R.ifElse(
    R.isEmpty,
    R.always(0),
    R.compose(R.sum, R.map(R.propOr(0, 'xAdvance'))),
  ),
  trailingPositions,
);

export default trailingOffset;
