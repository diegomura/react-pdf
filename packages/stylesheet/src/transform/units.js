/**
 * Parses scalar value in value and unit pairs
 *
 * @param {string} value scalar value
 * @returns {Object} parsed value
 */
const parseValue = (value) => {
  const match = /^(-?\d*\.?\d+)(in|mm|cm|pt|vh|vw|px)?$/g.exec(value);

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

  const outputDpi = 72;
  const inputDpi = container.dpi || 72;
  const mmFactor = (1 / 25.4) * outputDpi;
  const cmFactor = (1 / 2.54) * outputDpi;

  switch (scalar.unit) {
    case 'in':
      return scalar.value * outputDpi;
    case 'mm':
      return scalar.value * mmFactor;
    case 'cm':
      return scalar.value * cmFactor;
    case 'vh':
      return scalar.value * (container.height / 100);
    case 'vw':
      return scalar.value * (container.width / 100);
    case 'px':
      return Math.round(scalar.value * (outputDpi / inputDpi));
    default:
      return scalar.value;
  }
};

export default transformUnit;
