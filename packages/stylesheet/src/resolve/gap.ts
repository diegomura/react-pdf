import { Container, Style, StyleKey } from '../types';
import transformUnit from '../utils/units';
import { processUnitValue } from './utils';

const processGapShorthand = <K extends StyleKey>(
  key: K,
  value: Style[K],
  container: Container,
) => {
  const match = `${value}`.split(' ');

  const rowGap = transformUnit(container, match?.[0] || value) as any;
  const columnGap = transformUnit(container, match?.[1] || value) as any;

  return { rowGap, columnGap };
};

const handlers = {
  gap: processGapShorthand<'gap'>,
  columnGap: processUnitValue<'columnGap'>,
  rowGap: processUnitValue<'rowGap'>,
};

export default handlers;
