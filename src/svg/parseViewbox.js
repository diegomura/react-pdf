const parseViewbox = value => {
  const values = value.split(/[,\s]+/).map(parseFloat);
  if (values.length !== 4) return null;
  return { minX: values[0], minY: values[1], maxX: values[2], maxY: values[3] };
};

export default parseViewbox;
