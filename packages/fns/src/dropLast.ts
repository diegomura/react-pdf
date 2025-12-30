/**
 * Drops the last element from an array or string.
 *
 * @param value - The array or string to drop the last element from
 * @returns A new array or string with the last element removed
 */
function dropLast(value: string): string;
function dropLast<T>(value: T[]): T[];
function dropLast<T>(value: string | T[]): string | T[] {
  return value.slice(0, -1);
}

export default dropLast;
