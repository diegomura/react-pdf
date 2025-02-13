// https://developer.mozilla.org/en-US/docs/Web/CSS/flex#values

import { FlexboxStyle } from '../types';

// TODO: change flex defaults to [0, 1, 'auto'] as in spec in next major release
const flexDefaults: FlexboxStyle = { flexGrow: 1, flexShrink: 1, flexBasis: 0 };

const flexAuto: FlexboxStyle = {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto',
};

type FlexValue = FlexboxStyle['flex'];

const expandFlex = (key: 'flex', value: FlexValue): FlexboxStyle => {
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
