/**
 * Returns the last element of an array or last character of a string.
 *
 * @example
 * last([1, 2, 3]) // => 3
 * last('abc')     // => 'c'
 * last([])        // => undefined
 * last('')        // => ''
 *
 * @param value - The array or string
 * @returns The last element/character, or undefined for empty arrays
 */
function last(value: string): string;
function last<T>(value: T[]): T | undefined;
function last(value: string | any[]): any {
  return value === '' ? '' : value[value.length - 1];
}

export default last;
