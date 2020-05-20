import * as R from 'ramda';

const isOdd = x => x % 2 !== 0;

const lengthIsOdd = R.o(isOdd, R.prop('length'));

const parsePoints = R.compose(
  R.splitEvery(2),
  R.map(parseFloat),
  R.when(lengthIsOdd, R.slice(0, -1)),
  R.split(/\s+/),
  R.replace(/(\d)-(\d)/g, '$1 -$2'),
  R.replace(/,/g, ' '),
  R.trim,
);

export default parsePoints;
