/**
 * Capitalize first letter of each word
 *
 * @param {string} value string
 * @returns {string} capitalized string
 */
const capitalize = (value) => {
  if (!value) return value;
  return value.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
};

export default capitalize;
