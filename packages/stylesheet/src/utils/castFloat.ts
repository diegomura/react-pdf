const matchNumber = (value) =>
  typeof value === 'string' && /^-?\d*\.?\d*$/.test(value);

const castFloat = (value) => {
  if (typeof value !== 'string') return value;
  if (matchNumber(value)) return parseFloat(value);
  return value;
};

export default castFloat;
