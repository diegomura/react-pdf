import { castFloat } from './utils';

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

const processFontWeight = (key, value) => {
  if (!value) return { fontWeight: FONT_WEIGHTS.normal };
  if (typeof value === 'number') return { fontWeight: value };

  const lv = value.toLowerCase();

  if (FONT_WEIGHTS[lv]) return { fontWeight: FONT_WEIGHTS[lv] };

  return { fontWeight: castFloat(value) };
};

export default processFontWeight;
