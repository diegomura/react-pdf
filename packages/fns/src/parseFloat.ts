/**
 * Parse a string or number to a float
 *
 * @param value - String or number
 * @returns Parsed float
 */
const parseFloat = (value: string | number) => {
  return typeof value === 'string' ? Number.parseFloat(value) : value;
};

export default parseFloat;
