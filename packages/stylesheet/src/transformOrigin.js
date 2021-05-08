import * as R from 'ramda';

import { castFloat } from './utils';

const TRANSFORM_ORIGIN_REGEX = /(-?\d+(px|in|mm|cm|pt|%|vw|vh|px)?)|top|right|bottom|left|center/g;

const matchTransformOrigin = R.match(TRANSFORM_ORIGIN_REGEX);

const transformOffsetKeywords = value => {
  switch (value) {
    case 'top':
    case 'left':
      return '0%';
    case 'right':
    case 'bottom':
      return '100%';
    case 'center':
      return '50%';
    default:
      return castFloat(value);
  }
};

const Y_AXIS_SHORTHANDS = { top: true, bottom: true };

const sortTransformOriginPair = (a, b) => {
  if (Y_AXIS_SHORTHANDS[a]) return 1;
  if (Y_AXIS_SHORTHANDS[b]) return -1;
  return 0;
};

const getTransformOriginPair = values => {
  if (!values || values.length === 0) return ['center', 'center'];

  const pair = values.length === 1 ? [values[0], 'center'] : values;

  return pair.sort(sortTransformOriginPair);
};

// Transforms shorthand transformOrigin values
const processTransformOrigin = (key, value) => {
  const match = matchTransformOrigin(`${value}`);

  if (!match) return value;

  const pair = getTransformOriginPair(match);

  return {
    transformOriginX: transformOffsetKeywords(pair[0]),
    transformOriginY: transformOffsetKeywords(pair[1]),
  };
};

export default processTransformOrigin;
