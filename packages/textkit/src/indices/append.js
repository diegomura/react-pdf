import * as R from 'ramda';

/**
 * Append glyph indices with given length
 *
 * Ex. appendIndices(3, [0, 1, 2, 2]) => [0, 1, 2, 2, 3, 3, 3]
 *
 * @param  {number}  length
 * @param  {Array}  glyph indices
 * @return {Array}  extended glyph indices
 */
const appendIndices = (length, indices) =>
  R.converge(R.concat, [
    R.identity,
    R.converge(R.repeat, [
      R.either(
        R.o(R.inc, R.last), // Value should be last plus 1
        R.always(0), // Or zero if inserting at beggining
      ),
      R.always(length),
    ]),
  ])(indices);

export default R.curryN(2, appendIndices);
