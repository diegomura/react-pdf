import {
  processNoopValue,
  processNumberValue,
  processUnitValue,
} from './utils';

const handlers = {
  aspectRatio: processNumberValue,
  bottom: processUnitValue,
  display: processNoopValue,
  left: processUnitValue,
  position: processNoopValue,
  right: processUnitValue,
  top: processUnitValue,
  overflow: processNoopValue,
  zIndex: processNumberValue,
};

export default handlers;
