export const inheritedProperties = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'visibility',
  'wordSpacing',
];

export const flatStyles = stylesArray =>
  stylesArray.reduce((acc, style) => ({ ...acc, ...style }), {});
