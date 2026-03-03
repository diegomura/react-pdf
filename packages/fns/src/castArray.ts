/**
 * Casts value to array
 *
 * @template T - The type of the value.
 * @param value - The value to cast into an array.
 * @returns The value as-is if already an array, otherwise wrapped in an array.
 */
const castArray = <T>(value: T | T[]): T[] => {
  return Array.isArray(value) ? value : [value];
};

export default castArray;
