/**
 * Converts the first character of a string to uppercase. Does not affect other characters.
 *
 * @example
 * upperFirst('hello')  // => 'Hello'
 * upperFirst('hELLO')  // => 'HELLO'
 * upperFirst('')       // => ''
 * upperFirst(null)     // => null
 *
 * @param value - The string to transform
 * @returns String with first character uppercased, or the original value if null/undefined/empty
 */
const upperFirst = <T extends string | null | undefined>(
  value: T,
): T extends string ? string : T => {
  if (!value) return value as any;
  return (value.charAt(0).toUpperCase() + value.slice(1)) as any;
};

export default upperFirst;
