const castInt = (value: string | number): number => {
  if (typeof value === 'number') return value;

  return parseInt(value, 10);
};

export default castInt;
