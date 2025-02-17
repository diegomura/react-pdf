import { processColorValue, processNumberValue } from './utils';

const handlers = {
  backgroundColor: processColorValue,
  color: processColorValue,
  opacity: processNumberValue,
};

export default handlers;
