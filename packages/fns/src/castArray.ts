/**
 * Casts value to array
 *
 * @template T - The type of the value.
 * @param value - The value to cast into an array.
 * @returns An array containing the given value.
 */
const castArray = <T = any>(value: T | T[]): T[] => {
  return Array.isArray(value) ? value : [value];
};

export default castArray;
