import {
  processColorValue,
  processNoopValue,
  processNumberValue,
} from './utils';

const handlers = {
  backgroundColor: processColorValue<'backgroundColor'>,
  backgroundImage: processNoopValue<'backgroundImage'>,
  color: processColorValue<'color'>,
  opacity: processNumberValue<'opacity'>,
};

export default handlers;
