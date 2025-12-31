// https://developer.mozilla.org/en-US/docs/Web/CSS/flex#values

import { parseFloat } from '@react-pdf/fns';
import { Container, Style, StyleKey } from '../types';
import transformUnit from '../utils/units';
import {
  processNoopValue,
  processNumberValue,
  processUnitValue,
} from './utils';

type FlexDefaults = (number | string)[];

// TODO: change flex defaults to [0, 1, 'auto'] as in spec in next major release
const flexDefaults: FlexDefaults = [1, 1, 0];

const flexAuto: FlexDefaults = [1, 1, 'auto'];

const flexNone: FlexDefaults = [0, 0, 'auto'];

const flexInitial: FlexDefaults = [0, 1, 'auto'];

const processFlexShorthand = <K extends StyleKey>(
  key: K,
  value: Style[K],
  container: Container,
) => {
  let defaults = flexDefaults;
  let matches: string[] = [];

  if (value === 'auto') {
    defaults = flexAuto;
  } else if (value === 'none') {
    defaults = flexNone;
  } else if (value === 'initial') {
    defaults = flexInitial;
  } else {
    matches = `${value}`.split(' ');
  }

  const flexGrow = parseFloat(matches[0] || defaults[0]);
  const flexShrink = parseFloat(matches[1] || defaults[1]);
  const flexBasis = transformUnit(container, matches[2] || defaults[2]);

  return { flexGrow, flexShrink, flexBasis };
};

const handlers = {
  alignContent: processNoopValue<'alignContent'>,
  alignItems: processNoopValue<'alignItems'>,
  alignSelf: processNoopValue<'alignSelf'>,
  flex: processFlexShorthand<'flex'>,
  flexBasis: processUnitValue<'flexBasis'>,
  flexDirection: processNoopValue<'flexDirection'>,
  flexFlow: processNoopValue<'flexFlow'>,
  flexGrow: processNumberValue<'flexGrow'>,
  flexShrink: processNumberValue<'flexShrink'>,
  flexWrap: processNoopValue<'flexWrap'>,
  justifyContent: processNoopValue<'justifyContent'>,
  justifySelf: processNoopValue<'justifySelf'>,
};

export default handlers;
