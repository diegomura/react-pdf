/**
 * Returns a new array with all the values from the original array that are not present in the keys array.
 *
 * @param {any[]} keys the keys to pick from the object
 * @param {any[]} array to filter the values from
 * @returns {any[]} a new array with without the omitted values
 */
const without = (keys, array) => {
  const result = [];

  for (let i = 0; i < array.length; i += 1) {
    const value = array[i];

    if (!keys.includes(value)) result.push(value);
  }

  return result;
};

export default without;
