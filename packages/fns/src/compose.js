/* eslint-disable no-await-in-loop */

import reverse from './reverse';

/**
 * @typedef {Function} Compose
 * @param {any} value
 * @param {...any} args
 * @returns {any} result
 */

/**
 * Performs right-to-left function composition
 *
 * @param {...Function} fns functions
 * @returns {Compose} composed function
 */
const compose = (...fns) => (value, ...args) => {
  let result = value;
  const reversedFns = reverse(fns);

  for (let i = 0; i < reversedFns.length; i += 1) {
    const fn = reversedFns[i];
    result = fn(result, ...args);
  }

  return result;
};

export default compose;
