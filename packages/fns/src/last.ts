/**
 * Returns the last character of a string.
 *
 * @param value - The input value
 * @returns The last character of the string
 */
function last(value: string): string;
function last<T>(value: T[]): T;
function last(value: string | any[]): any {
  return value === '' ? '' : value[value.length - 1];
}

export default last;
