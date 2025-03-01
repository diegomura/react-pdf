import {
  processNoopValue,
  processNumberValue,
  processUnitValue,
} from './utils';

const handlers = {
  aspectRatio: processNumberValue<'aspectRatio'>,
  bottom: processUnitValue<'bottom'>,
  display: processNoopValue<'display'>,
  left: processUnitValue<'left'>,
  position: processNoopValue<'position'>,
  right: processUnitValue<'right'>,
  top: processUnitValue<'top'>,
  overflow: processNoopValue<'overflow'>,
  zIndex: processNumberValue<'zIndex'>,
};

export default handlers;
