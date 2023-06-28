/* eslint-disable no-await-in-loop */

/**
 * Performs right-to-left function composition
 *
 * @param  {...any} functions
 */
const compose = (...fns) => (value, ...args) => {
  let result = value;

  for (let i = fns.length - 1; i >= 0; i -= 1) {
    const fn = fns[i];
    result = fn(result, ...args);
  }

  return result;
};

export default compose;
