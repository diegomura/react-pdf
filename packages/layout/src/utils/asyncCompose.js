/* eslint-disable no-await-in-loop */

import * as R from 'ramda';

/**
 * Performs right-to-left function composition with async functions support
 *
 * @param  {...any} functions
 */
const asyncCompose = (...fns) => async (value, ...args) => {
  let result = value;
  const reversedFns = R.reverse(fns);

  for (let i = 0; i < reversedFns.length; i += 1) {
    const fn = reversedFns[i];
    result = await fn(result, ...args);
  }

  return result;
};

export default asyncCompose;
