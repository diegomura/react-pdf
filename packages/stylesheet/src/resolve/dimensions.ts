import { processUnitValue } from './utils';

const handlers = {
  height: processUnitValue<'height'>,
  maxHeight: processUnitValue<'maxHeight'>,
  maxWidth: processUnitValue<'maxWidth'>,
  minHeight: processUnitValue<'minHeight'>,
  minWidth: processUnitValue<'minWidth'>,
  width: processUnitValue<'width'>,
};

export default handlers;
