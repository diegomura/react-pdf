import * as R from 'ramda';

/**
 * Prepend glyph indices with given length
 *
 * Ex. prepend(3, [0, 1, 2, 2]) => [0, 0, 0, 1, 2, 3, 3]
 *
 * @param  {number}  length
 * @param  {Array}  glyph indices
 * @return {Array}  extended glyph indices
 */
const prepend = (length, indices) => {
  if (length === 0) return indices;

  return R.converge(R.concat, [
    R.converge(R.repeat, [R.always(0), R.always(length)]),
    R.map(R.inc),
  ])(indices);
};

export default R.curryN(2, prepend);
