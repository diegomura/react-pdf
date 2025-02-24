/**
 * Capitalize first letter of each word
 *
 * @param value - Any string
 * @returns Capitalized string
 */
const capitalize = (value?: string | null) => {
  if (!value) return value;
  return value.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
};

export default capitalize;
