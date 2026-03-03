const matchNumber = (value: string): boolean =>
  /^-?(\d+\.?\d*|\d*\.\d+)$/.test(value);

const castFloat = (value: string | number): string | number => {
  if (typeof value !== 'string') return value;
  if (matchNumber(value)) return parseFloat(value);
  return value;
};

export default castFloat;
