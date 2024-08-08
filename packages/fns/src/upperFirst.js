/**
 * Capitalize first letter of string
 *
 * @param {string} value string
 * @returns {string} capitalized string
 */
const upperFirst = (value) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default upperFirst;
