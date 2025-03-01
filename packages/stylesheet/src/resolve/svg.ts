import {
  processColorValue,
  processNoopValue,
  processNumberValue,
  processUnitValue,
} from './utils';

const handlers = {
  fill: processColorValue<'fill'>,
  stroke: processColorValue<'stroke'>,
  strokeDasharray: processNoopValue<'strokeDasharray'>,
  strokeWidth: processUnitValue<'strokeWidth'>,
  fillOpacity: processNumberValue<'fillOpacity'>,
  strokeOpacity: processNumberValue<'strokeOpacity'>,
  fillRule: processNoopValue<'fillRule'>,
  textAnchor: processNoopValue<'textAnchor'>,
  strokeLinecap: processNoopValue<'strokeLinecap'>,
  strokeLinejoin: processNoopValue<'strokeLinejoin'>,
  visibility: processNoopValue<'visibility'>,
  clipPath: processNoopValue<'clipPath'>,
  dominantBaseline: processNoopValue<'dominantBaseline'>,
};

export default handlers;
