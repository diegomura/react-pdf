/**
 * Check if value is a number
 *
 * @template {unknown} T
 * @param {T} value Value to check
 * @returns {value is number} Whether value is a number
 */
const isNumber = (value) => {
  return typeof value === 'number';
};

export default isNumber;
