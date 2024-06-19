/**
 * Maps over the values of an object and applies a function to each value.
 *
 * @param {Object} object the object to map over
 * @param {Function} fn the function to apply to each value
 * @returns {Object} a new object with the mapped values
 */
const mapValues = (object, fn) => {
  const entries = Object.entries(object);

  return entries.reduce((acc, [key, value], index) => {
    acc[key] = fn(value, key, index);
    return acc;
  }, {});
};

export default mapValues;
