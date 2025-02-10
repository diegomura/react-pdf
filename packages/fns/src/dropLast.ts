/**
 * Drops the last element from an array.
 *
 * @template T
 * @param  array - The array to drop the last element from
 * @returns - The new array with the last element dropped
 */
const dropLast = <T = any>(array: string | T[]): string | T[] =>
  array.slice(0, array.length - 1);

export default dropLast;
