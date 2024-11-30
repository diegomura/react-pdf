/**
 * Parses scalar value in value and unit pairs
 *
 * @param {string} value scalar value
 * @returns {Object} parsed value
 */
const parseValue = (value) => {
  const match = /^(-?\d*\.?\d+)(in|mm|cm|pt|vh|vw|px|rem)?$/g.exec(value);

  return match
    ? { value: parseFloat(match[1]), unit: match[2] || 'pt' }
    : { value, unit: undefined };
};

/**
 * Transform given scalar value
 *
 * @param {Object} container
 * @param {string} value styles value
 * @returns {Object} transformed value
 */
const transformUnit = (container, value) => {
  const scalar = parseValue(value);

  const dpi = 72; // Removed: container.dpi || 72
  const mmFactor = (1 / 25.4) * dpi;
  const cmFactor = (1 / 2.54) * dpi;

  switch (scalar.unit) {
    case 'rem':
      return scalar.value * (container.remBase || 18);
    case 'in':
      return scalar.value * dpi;
    case 'mm':
      return scalar.value * mmFactor;
    case 'cm':
      return scalar.value * cmFactor;
    case 'vh':
      return scalar.value * (container.height / 100);
    case 'vw':
      return scalar.value * (container.width / 100);
    default:
      return scalar.value;
  }
};

export default transformUnit;
