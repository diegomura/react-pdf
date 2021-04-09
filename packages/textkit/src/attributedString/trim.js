import * as R from 'ramda';

import slice from './slice';

const testChar = R.test(/\S/g);

const findCharIndex = R.findIndex(testChar);

const findLastCharIndex = R.o(R.inc, R.findLastIndex(testChar));

/**
 * Removes (strips) whitespace from both ends of the attributted string.
 *
 * @param  {Object}  attributedString
 * @return {Object} attributedString
 */
const trim = R.chain(
  R.apply(slice),
  R.compose(R.juxt([findCharIndex, findLastCharIndex]), R.prop('string')),
);

export default trim;
