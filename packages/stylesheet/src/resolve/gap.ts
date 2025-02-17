import transformUnit from '../utils/units';
import { processUnitValue } from './utils';

const processGapShorthand = (key, value, container) => {
  const match = `${value}`.split(' ');

  const rowGap = transformUnit(container, match?.[0] || value);
  const columnGap = transformUnit(container, match?.[1] || value);

  return { rowGap, columnGap };
};

const handlers = {
  gap: processGapShorthand,
  columnGap: processUnitValue,
  rowGap: processUnitValue,
};

export default handlers;
