import { Container } from '../types';

type ParsedValue =
  | { value: number; unit: string }
  | { value: number | string; unit: undefined };

/**
 * Parses scalar value in value and unit pairs
 *
 * @param value - Scalar value
 * @returns Parsed value
 */
const parseValue = (value: string | number): ParsedValue => {
  if (typeof value === 'number') return { value, unit: undefined };

  const match = /^(-?\d*\.?\d+)(in|mm|cm|pt|vh|vw|px|rem)?$/g.exec(value);

  return match
    ? { value: parseFloat(match[1]), unit: match[2] || 'pt' }
    : { value, unit: undefined };
};

/**
 * Transform given scalar value
 *
 * @param container
 * @param value - Styles value
 * @returns Transformed value
 */
const transformUnit = (container: Container, value: string | number) => {
  const scalar = parseValue(value);

  const outputDpi = 72;
  const inputDpi = container.dpi || 72;
  const mmFactor = (1 / 25.4) * outputDpi;
  const cmFactor = (1 / 2.54) * outputDpi;

  if (typeof scalar.value !== 'number') return scalar.value;

  switch (scalar.unit) {
    case 'rem':
      return scalar.value * (container.remBase || 18);
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
