/**
 * Parses scalar value in value and unit pairs
 *
 * @param {String} scalar value
 * @returns {Object} parsed value
 */
const parseValue = value => {
  const match = /^(-?\d*\.?\d+)(in|mm|cm|pt|vh|vw|px)?$/g.exec(value);

  return match
    ? { value: parseFloat(match[1], 10), unit: match[2] || 'pt' }
    : { value, unit: undefined };
};

/**
 * Transform given scalar value
 *
 * @param {Object} container
 * @param {String} styles value
 * @returns {Object} transformed value
 */
const transformUnit = (container, value) => {
  const scalar = parseValue(value);

  const dpi = container.dpi || 72;
  const mmFactor = (1 / 25.4) * dpi;
  const cmFactor = (1 / 2.54) * dpi;

  switch (scalar.unit) {
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
