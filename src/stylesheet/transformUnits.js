const DPI = 72; // 72pt per inch.

const parseValue = value => {
  const match = /^(-?\d*\.?\d+)(in|mm|cm|pt|vh|vw)?$/g.exec(value);

  if (match) {
    return { value: parseFloat(match[1], 10), unit: match[2] || 'pt' };
  }

  return { value, unit: undefined };
};

const parseScalar = (value, container) => {
  const scalar = parseValue(value);
  switch (scalar.unit) {
    case 'in':
      return scalar.value * DPI;
    case 'mm':
      return scalar.value * (1 / 25.4) * DPI;
    case 'cm':
      return scalar.value * (1 / 2.54) * DPI;
    case 'vh':
      if (container.isAutoHeight) {
        throw new Error(
          'vh unit not supported in auto-height pages. Please specify page height if you want to use vh.',
        );
      }

      return scalar.value * (container.height / 100);
    case 'vw':
      return scalar.value * (container.width / 100);
    default:
      return scalar.value;
  }
};

export default parseScalar;
