import { Container } from '../types';

type Unit = 'in' | 'mm' | 'cm' | 'pt' | 'vh' | 'vw' | 'px' | 'rem';

type ParsedValue =
  | { value: number; unit: Unit }
  | { value: number | string; unit: undefined };

const VALUE_REGEX = /^(-?\d*\.?\d+)(in|mm|cm|pt|vh|vw|px|rem)?$/;

const DEFAULT_DPI = 72;
const DEFAULT_REM_BASE = 18;
const MM_PER_INCH = 25.4;
const CM_PER_INCH = 2.54;

/**
 * Parses scalar value in value and unit pairs
 *
 * @param value - Scalar value
 * @returns Parsed value
 */
const parseValue = (value: string | number): ParsedValue => {
  if (typeof value === 'number') return { value, unit: undefined };

  const match = VALUE_REGEX.exec(value);

  return match
    ? { value: parseFloat(match[1]), unit: (match[2] || 'pt') as Unit }
    : { value, unit: undefined };
};

/**
 * Transform given scalar value to points
 *
 * @param container - Container with dimensions and settings
 * @param value - Styles value
 * @returns Transformed value in points
 */
const transformUnit = (
  container: Container,
  value: string | number,
): string | number => {
  const scalar = parseValue(value);

  if (typeof scalar.value !== 'number') return scalar.value;

  const inputDpi = container.dpi || DEFAULT_DPI;

  switch (scalar.unit) {
    case 'rem':
      return scalar.value * (container.remBase || DEFAULT_REM_BASE);
    case 'in':
      return scalar.value * DEFAULT_DPI;
    case 'mm':
      return scalar.value * (DEFAULT_DPI / MM_PER_INCH);
    case 'cm':
      return scalar.value * (DEFAULT_DPI / CM_PER_INCH);
    case 'vh':
      return scalar.value * (container.height / 100);
    case 'vw':
      return scalar.value * (container.width / 100);
    case 'px':
      return Math.round(scalar.value * (DEFAULT_DPI / inputDpi));
    default:
      return scalar.value;
  }
};

export default transformUnit;
