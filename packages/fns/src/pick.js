/**
 * Picks the specified keys from an object and returns a new object with only those keys.
 *
 * @param {string[]} keys the keys to pick from the object
 * @param {object} obj the object to pick the keys from
 * @returns {object} a new object with only the picked keys
 */
const pick = (keys, obj) => {
  const result = {};

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (key in obj) result[key] = obj[key];
  }

  return result;
};

export default pick;
