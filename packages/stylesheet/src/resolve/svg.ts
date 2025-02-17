import {
  processColorValue,
  processNoopValue,
  processNumberValue,
  processUnitValue,
} from './utils';

const handlers = {
  fill: processColorValue,
  stroke: processColorValue,
  strokeDasharray: processNoopValue,
  strokeWidth: processUnitValue,
  fillOpacity: processNumberValue,
  strokeOpacity: processNumberValue,
  fillRule: processNoopValue,
  textAnchor: processNoopValue,
  strokeLinecap: processNoopValue,
  strokeLinejoin: processNoopValue,
  visibility: processNoopValue,
  clipPath: processNoopValue,
  dominantBaseline: processNoopValue,
};

export default handlers;
