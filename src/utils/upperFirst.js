import * as R from 'ramda';

/**
 * Capitalize first letter of string
 *
 * @param {String} string
 * @returns {String} capitalized string
 */
const upperFirst = R.ifElse(
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

export default upperFirst;
