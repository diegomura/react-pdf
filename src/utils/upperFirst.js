/**
 * Capitalize first string char
 *
 * @param {String} value
 * @returns {String} same string with first char capitalized
 */
const upperFirst = value => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default upperFirst;
