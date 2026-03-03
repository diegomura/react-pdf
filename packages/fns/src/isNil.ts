/**
 * Checks if a value is null or undefined.
 *
 * @example
 * isNil(null)      // => true
 * isNil(undefined) // => true
 * isNil(0)         // => false
 *
 * @param value - The value to check
 * @returns True if the value is null or undefined, false otherwise
 */
const isNil = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

export default isNil;
