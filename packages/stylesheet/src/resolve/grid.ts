import { processNoopValue } from './utils';

const handlers = {
  gridTemplateColumns: processNoopValue<'gridTemplateColumns'>,
  gridTemplateRows: processNoopValue<'gridTemplateRows'>,
  gridAutoColumns: processNoopValue<'gridAutoColumns'>,
  gridAutoRows: processNoopValue<'gridAutoRows'>,
  gridAutoFlow: processNoopValue<'gridAutoFlow'>,
  gridColumn: processNoopValue<'gridColumn'>,
  gridColumnStart: processNoopValue<'gridColumnStart'>,
  gridColumnEnd: processNoopValue<'gridColumnEnd'>,
  gridRow: processNoopValue<'gridRow'>,
  gridRowStart: processNoopValue<'gridRowStart'>,
  gridRowEnd: processNoopValue<'gridRowEnd'>,
};

export default handlers;
