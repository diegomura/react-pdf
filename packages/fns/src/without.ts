/**
 * Returns a new array excluding the specified values.
 *
 * @example
 * without([2, 4], [1, 2, 3, 4, 5]) // => [1, 3, 5]
 * without(['b'], ['a', 'b', 'c'])  // => ['a', 'c']
 *
 * @param exclude - Values to exclude from the array
 * @param array - Array to filter
 * @returns A new array without the excluded values
 */
const without = <T>(exclude: T[], array: T[]): T[] => {
  const result: T[] = [];

  for (let i = 0; i < array.length; i += 1) {
    const value = array[i];

    if (!exclude.includes(value)) result.push(value);
  }

  return result;
};

export default without;
