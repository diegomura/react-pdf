/**
 * Casts value to array
 *
 * @param {any} value
 * @returns {Array} casted value
 */
const castArray = value => {
  return Array.isArray(value) ? value : [value];
};

export default castArray;
