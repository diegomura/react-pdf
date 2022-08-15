const flexDefaults = [1, 1, 0];

const expandFlex = (key, value) => {
  const matches = `${value}`.split(' ');

  const flexGrow = matches[0] || flexDefaults[0];
  const flexShrink = matches[1] || flexDefaults[1];
  const flexBasis = matches[2] || flexDefaults[2];

  return { flexGrow, flexShrink, flexBasis };
};

export default expandFlex;
