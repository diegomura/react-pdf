/**
 * Check if value is a number
 *
 * @param value - Value to check
 * @returns Whether value is a number
 */
const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

export default isNumber;
