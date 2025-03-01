import { processColorValue, processNumberValue } from './utils';

const handlers = {
  backgroundColor: processColorValue<'backgroundColor'>,
  color: processColorValue<'color'>,
  opacity: processNumberValue<'opacity'>,
};

export default handlers;
