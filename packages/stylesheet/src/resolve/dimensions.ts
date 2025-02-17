import { processUnitValue } from './utils';

const handlers = {
  height: processUnitValue,
  maxHeight: processUnitValue,
  maxWidth: processUnitValue,
  minHeight: processUnitValue,
  minWidth: processUnitValue,
  width: processUnitValue,
};

export default handlers;
