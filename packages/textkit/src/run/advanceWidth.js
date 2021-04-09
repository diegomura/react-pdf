import * as R from 'ramda';

/**
 * Return run advance width
 *
 * @param  {Object}  run
 * @return {number} advance width
 */
const advanceWidth = R.compose(
  R.reduce(R.useWith(R.add, [R.identity, R.propOr(0, 'xAdvance')]), 0),
  R.propOr([], 'positions'),
);

export default advanceWidth;
