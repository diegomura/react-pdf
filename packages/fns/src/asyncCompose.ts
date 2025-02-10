/* eslint-disable no-await-in-loop */

import reverse from './reverse';

/**
 * Performs right-to-left function composition with async functions support
 *
 * @param fns - Functions
 * @returns Composed function
 */
const asyncCompose =
  (...fns: any[]) =>
  async (value: any, ...args: any[]) => {
    let result = value;
    const reversedFns = reverse(fns);

    for (let i = 0; i < reversedFns.length; i += 1) {
      const fn = reversedFns[i];
      result = await fn(result, ...args);
    }

    return result;
  };

export default asyncCompose;
