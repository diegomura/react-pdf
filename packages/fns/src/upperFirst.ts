/**
 * Capitalize first letter of string
 *
 * @param value - String
 * @returns Capitalized string
 */
const upperFirst = (value?: string | null): string | null | undefined => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default upperFirst;
