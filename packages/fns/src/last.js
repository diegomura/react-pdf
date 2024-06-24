/**
 * Returns the last character of a string.
 *
 * @param {string} value the input string
 * @returns {string} the last character of the string
 */
const last = (value) => {
  return value === '' ? '' : value[value.length - 1];
};

export default last;
