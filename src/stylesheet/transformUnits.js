const parseValue = value => {
  const match = /^(-?\d*\.?\d+)(in|mm|cm|pt|vh|vw)?$/g.exec(value);

  if (match) {
    return { value: parseFloat(match[1], 10), unit: match[2] || 'pt' };
  } else {
    return { value, unit: undefined };
  }
};

const parseScalar = (value, container) => {
  let result = {};
  const scalar = parseValue(value);

  switch (scalar.unit) {
    case 'in':
      result = scalar.value * 72;
      break;
    case 'mm':
      result = scalar.value * (1 / 25.4) * 72;
      break;
    case 'cm':
      result = scalar.value * (1 / 2.54) * 72;
      break;
    case 'vh':
      result = scalar.value * (container.height / 100);
      break;
    case 'vw':
      result = scalar.value * (container.width / 100);
      break;
    default:
      result = scalar.value;
  }

  return result;
};

export default parseScalar;
