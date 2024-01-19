/**
 * Casts value to array
 *
 * @template T
 * @param {T|T[]} value value
 * @returns {T[]} array
 */
const castArray = value => {
  return Array.isArray(value) ? value : [value];
};

export default castArray;
