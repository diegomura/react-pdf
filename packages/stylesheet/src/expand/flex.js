// https://developer.mozilla.org/en-US/docs/Web/CSS/flex#values

// TODO: change flex defaults to [0, 1, 'auto'] as in spec in next major release
const flexDefaults = [1, 1, 0];
const flexAuto = [1, 1, 'auto'];

const expandFlex = (key, value) => {
  let defaults = flexDefaults;
  let matches = [];
  if (value === 'auto') {
    defaults = flexAuto;
  } else {
    matches = `${value}`.split(' ');
  }

  const flexGrow = matches[0] || defaults[0];
  const flexShrink = matches[1] || defaults[1];
  const flexBasis = matches[2] || defaults[2];

  return { flexGrow, flexShrink, flexBasis };
};

export default expandFlex;
