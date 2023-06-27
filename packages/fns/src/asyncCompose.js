/* eslint-disable no-await-in-loop */

/**
 * Performs right-to-left function composition with async functions support
 *
 * @param  {...any} functions
 */
const asyncCompose = (...fns) => async (value, ...args) => {
  let result = value;

  for (let i = fns.length - 1; i >= 0; i -= 1) {
    const fn = fns[i];
    result = await fn(result, ...args);
  }

  return result;
};

export default asyncCompose;
