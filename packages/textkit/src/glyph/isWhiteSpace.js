import * as R from 'ramda';

const WHITE_SPACES_CODES = [32];

/**
 * Check if glyph is white space
 *
 * @param  {Object}  glyph
 * @return {Boolean}  is white space
 * */
const isWhiteSpace = R.compose(
  R.not,
  R.isEmpty,
  R.intersection(WHITE_SPACES_CODES),
  R.propOr([], 'codePoints'),
);

export default isWhiteSpace;
