import { Container, GapSafeStyle, Style, StyleKey } from '../types';
import transformUnit from '../utils/units';
import { processUnitValue } from './utils';

const processGapShorthand = <K extends StyleKey>(
  _key: K,
  value: Style[K],
  container: Container,
): GapSafeStyle => {
  const parts = `${value}`.split(' ');

  const rowGap = transformUnit(container, parts[0]);
  const columnGap = transformUnit(container, parts[1] || parts[0]);

  return { rowGap, columnGap };
};

const handlers = {
  gap: processGapShorthand<'gap'>,
  columnGap: processUnitValue<'columnGap'>,
  rowGap: processUnitValue<'rowGap'>,
};

export default handlers;
