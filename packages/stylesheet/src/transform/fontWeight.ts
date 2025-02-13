import { FontWeight } from '../types';

const FONT_WEIGHTS = {
  thin: 100,
  hairline: 100,
  ultralight: 200,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  ultrabold: 800,
  extrabold: 800,
  heavy: 900,
  black: 900,
};

const processFontWeight = (value: FontWeight): number => {
  if (!value) return FONT_WEIGHTS.normal;

  if (typeof value === 'number') return value;

  const lv = value.toLowerCase();

  if (lv in FONT_WEIGHTS) return FONT_WEIGHTS[lv];

  return Number(value);
};

export default processFontWeight;
