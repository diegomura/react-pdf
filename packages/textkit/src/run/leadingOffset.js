import * as R from 'ramda';

import isWhiteSpace from '../glyph/isWhiteSpace';

/**
 * Get white space leading positions
 *
 * @param  {Object}  run
 * @return {Array} white space leading positions
 */
const leadingPositions = R.converge(R.slice(0), [
  R.compose(R.length, R.takeWhile(isWhiteSpace), R.propOr([], 'glyphs')),
  R.propOr([], 'positions'),
]);

/**
 * Get run leading white space offset
 *
 * @param  {Object}  run
 * @return {number} leading white space offset
 */
const leadingOffset = R.compose(
  R.ifElse(
    R.isEmpty,
    R.always(0),
    R.compose(R.sum, R.map(R.propOr(0, 'xAdvance'))),
  ),
  leadingPositions,
);

export default leadingOffset;
