/**
 * Returns a new array with all the values from the original array that are not present in the keys array.
 *
 * @param keys - The keys to pick from the object
 * @param array - Array to filter the values from
 * @returns A new array with without the omitted values
 */
const without = <T = any>(keys: T[], array: T[]): T[] => {
  const result = [];

  for (let i = 0; i < array.length; i += 1) {
    const value = array[i];

    if (!keys.includes(value)) result.push(value);
  }

  return result;
};

export default without;
