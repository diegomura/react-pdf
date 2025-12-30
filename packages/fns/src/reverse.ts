/**
 * Returns a new array with elements in reverse order. Does not mutate the original.
 *
 * @example
 * reverse([1, 2, 3]) // => [3, 2, 1]
 * reverse(['a', 'b']) // => ['b', 'a']
 *
 * @param array - Array to be reversed
 * @returns New array with elements reversed
 */
const reverse = <T>(array: T[]): T[] => array.slice().reverse();

export default reverse;
