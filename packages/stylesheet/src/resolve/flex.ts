// https://developer.mozilla.org/en-US/docs/Web/CSS/flex#values

import transformUnit from '../utils/units';
import { processNoopValue, processUnitValue } from './utils';

type FlexDefaults = (number | string | 'auto')[];

// TODO: change flex defaults to [0, 1, 'auto'] as in spec in next major release
const flexDefaults: FlexDefaults = [1, 1, 0];

const flexAuto: FlexDefaults = [1, 1, 'auto'];

const processFlexShorthand = (key, value, container) => {
  let defaults = flexDefaults;
  let matches: FlexDefaults = [];

  if (value === 'auto') {
    defaults = flexAuto;
  } else {
    matches = `${value}`.split(' ');
  }

  const flexGrow = transformUnit(container, matches[0] || defaults[0]);
  const flexShrink = transformUnit(container, matches[1] || defaults[1]);
  const flexBasis = transformUnit(container, matches[2] || defaults[2]);

  return { flexGrow, flexShrink, flexBasis };
};

const handlers = {
  alignContent: processNoopValue,
  alignItems: processNoopValue,
  alignSelf: processNoopValue,
  flex: processFlexShorthand,
  flexBasis: processUnitValue,
  flexDirection: processNoopValue,
  flexFlow: processNoopValue,
  flexGrow: processUnitValue,
  flexShrink: processUnitValue,
  flexWrap: processNoopValue,
  justifyContent: processNoopValue,
  justifySelf: processNoopValue,
};

export default handlers;
