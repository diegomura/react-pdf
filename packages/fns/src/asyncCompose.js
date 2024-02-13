/* eslint-disable no-await-in-loop */

import reverse from './reverse';

/**
 * @typedef {Function} AsyncCompose
 * @param {any} value
 * @param {...any} args
 * @returns {any} result
 */

/**
 * Performs right-to-left function composition with async functions support
 *
 * @param {...Function} fns functions
 * @returns {AsyncCompose} composed function
 */
const asyncCompose =
  (...fns) =>
  async (value, ...args) => {
    let result = value;
    const reversedFns = reverse(fns);

    for (let i = 0; i < reversedFns.length; i += 1) {
      const fn = reversedFns[i];
      result = await fn(result, ...args);
    }

    return result;
  };

export default asyncCompose;
