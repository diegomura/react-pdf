/**
 * Repeats an element a specified number of times.
 *
 * @template {unknown} T
 * @param {T} element element to be repeated
 * @param {number} length number of times to repeat element
 * @returns {T[]} repeated elements
 */
const repeat = (elem, length = 0) => {
  const result = new Array(length);
  for (let i = 0; i < length; i += 1) {
    result[i] = elem;
  }
  return result;
};

export default repeat;
