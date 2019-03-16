// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
const FONT_WEIGHTS = {
  thin: 100,
  ultralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  ultrabold: 800,
  heavy: 900,
};

export const isFontWeightStyle = key => key.match(/^fontWeight/);

export const processFontWeight = value => {
  console.log(value);

  if (!value) return FONT_WEIGHTS.normal;
  if (typeof value === 'number') return value;
  return FONT_WEIGHTS[value.toLowerCase()];
};
