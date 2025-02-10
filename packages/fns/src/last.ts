/**
 * Returns the last character of a string.
 *
 * @param value - The input value
 * @returns The last character of the string
 */
const last = (value: string | any[]): any => {
  return value === '' ? '' : value[value.length - 1];
};

export default last;
