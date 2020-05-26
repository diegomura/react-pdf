import * as R from 'ramda';

const isNotNil = R.complement(R.isNil);

/**
 * Takes a list of predicates and returns the first predicate result that returns true for a given list of arguments
 *
 * @param  {...any} predicates
 * @param  {any} value
 */
const firstPass = (...fns) => value => {
  let res;

  for (const fn of fns) {
    res = fn(value);
    if (isNotNil(res)) return res;
  }

  return res;
};

export default firstPass;
