import * as R from 'ramda';

const capitalize = R.ifElse(
  R.isNil,
  R.identity,
  R.compose(
    R.join(''),
    R.juxt([
      R.compose(
        R.toUpper,
        R.head,
      ),
      R.tail,
    ]),
  ),
);

export default capitalize;
