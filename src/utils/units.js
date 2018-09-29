const parseValue = value => {
  const match = /^(\d*\.?\d+)(%|in|mm|cm|pt)?$/g.exec(value);

  if (match) {
    return { value: parseFloat(match[1], 10), unit: match[2] || 'pt' };
  } else {
    throw new Error(`Node: invalid value ${value}`);
  }
};

export const parseScalar = value => {
  let result = {};
  const scalar = parseValue(value);

  switch (scalar.unit) {
    case 'in':
      result = { value: scalar.value * 72, unit: 'pt' };
      break;
    case 'mm':
      result = { value: scalar.value * (1 / 25.4) * 72, unit: 'pt' };
      break;
    case 'cm':
      result = { value: scalar.value * (1 / 2.54) * 72, unit: 'pt' };
      break;
    default:
      result = { value: scalar.value, unit: scalar.unit };
  }

  return result;
};
