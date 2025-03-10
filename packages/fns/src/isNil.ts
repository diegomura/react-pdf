/**
 * Checks if a value is null or undefined.
 *
 * @template T - The type of the value.
 * @param value - The value to check
 * @returns True if the value is null or undefined, false otherwise
 */
const isNil = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

export default isNil;
