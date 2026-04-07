/**
 * Parse a string or number to a float. Non-string values pass through unchanged.
 *
 * @example
 * parseFloat('3.14')  // => 3.14
 * parseFloat(42)      // => 42
 * parseFloat('10px')  // => 10
 * parseFloat(null)    // => null
 *
 * @param value - The value to parse
 * @returns Parsed float for strings, original value otherwise
 */
const parseFloat = <T extends string | number | null | undefined>(
  value: T,
): T extends string ? number : T => {
  return (typeof value === 'string' ? Number.parseFloat(value) : value) as any;
};

export default parseFloat;
