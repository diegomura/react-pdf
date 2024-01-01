const expandGap = (key, value) => {
  const match = `${value}`.split(' ');

  return {
    rowGap: match?.[0] || value,
    columnGap: match?.[1] || value,
  };
};

export default expandGap;
