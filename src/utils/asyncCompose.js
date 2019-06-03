import * as R from 'ramda';

/**
 * Performs right-to-left function composition with async functions support
 *
 * @param  {...any} functions
 */
const asyncCompose = (...fns) => async value => {
  for (const fn of R.reverse(fns)) value = await fn(value);
  return value;
};

export default asyncCompose;
