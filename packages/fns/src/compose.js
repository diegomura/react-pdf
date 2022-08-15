/* eslint-disable no-await-in-loop */

import reverse from './reverse';

/**
 * Performs right-to-left function composition
 *
 * @param  {...any} functions
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
