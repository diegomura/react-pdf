import * as R from 'ramda';

import { FONT_WEIGHTS } from '../constants';

const BOX_MODEL_REGEX = /\d+(px|in|mm|cm|pt|%|vw|vh)?/g;
const OBJECT_POSITION_REGEX = /\d+(px|in|mm|cm|pt|%|vw|vh)?/g;
const BORDER_SHORTHAND_REGEX = /(\d+(px|in|mm|cm|pt|vw|vh)?)\s(\S+)\s(\S+)/;
const TRANSFORM_ORIGIN_REGEX = /(-?\d+(px|in|mm|cm|pt|%|vw|vh)?)|top|right|bottom|left|center/g;

const matchBoxModel = R.match(BOX_MODEL_REGEX);
const matchObjectPosition = R.match(OBJECT_POSITION_REGEX);
const matchBorderShorthand = R.match(BORDER_SHORTHAND_REGEX);
const matchTransformOrigin = R.match(TRANSFORM_ORIGIN_REGEX);

const isNumber = R.is(Number);

const isFontWeightStyle = key => key.match(/^fontWeight/);

const isBorderStyle = (key, value) =>
  key.match(/^border(Top|Right|Bottom|Left)(Color|Width|Style)/) &&
  typeof value === 'string';

const isBoxModelStyle = (key, value) =>
  key.match(/^(margin)|(padding)/) && typeof value === 'string';

const isObjectPositionStyle = (key, value) =>
  key.match(/^objectPosition/) && typeof value === 'string';

const isTransformOriginStyle = (key, value) =>
  key.match(/^transformOrigin/) && typeof value === 'string';

const isFlexGrow = key => key === 'flexGrow';

const isFlexShrink = key => key === 'flexShrink';

const isFlexBasis = key => key === 'flexBasis';

const processBorders = (key, value) => {
  const match = matchBorderShorthand(value);

  if (match) {
    if (key.match(/.Color/)) {
      return match[4] || value;
    } else if (key.match(/.Style/)) {
      return match[3] || value;
    } else if (key.match(/.Width/)) {
      return match[1] || value;
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};

const processBoxModel = (key, value) => {
  const match = matchBoxModel(value);

  if (match) {
    if (key.match(/.Top/)) {
      return match[0] || value;
    } else if (key.match(/.Right/)) {
      return match[1] || match[0] || value;
    } else if (key.match(/.Bottom/)) {
      return match[2] || match[0] || value;
    } else if (key.match(/.Left/)) {
      return match[3] || match[1] || match[0] || value;
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};

export const processFontWeight = (key, value) => {
  if (!value) return FONT_WEIGHTS.normal;
  if (typeof value === 'number') return value;
  return FONT_WEIGHTS[value.toLowerCase()];
};

export const processObjectPosition = (key, value) => {
  const match = matchObjectPosition(value);

  if (match) {
    if (key.match(/.X/)) {
      return match[0] || value;
    } else if (key.match(/.Y/)) {
      return match[1] || value;
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};

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
      return value;
  }
};

// Transforms shorthand transformOrigin values
const processTransformOrigin = (key, value) => {
  const match = matchTransformOrigin(value);

  if (match) {
    let result;

    if (key.match(/.X/)) {
      result = match[0] || value;
    } else if (key.match(/.Y/)) {
      result = match[1] || match[0] || value;
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }

    return transformOffsetKeywords(result);
  }

  return value;
};

const processFlexGrow = (key, value) => {
  if (isNumber(value)) return value;
  const matches = value.split(' ');
  return matches[0];
};

const processFlexShrink = (key, value) => {
  if (isNumber(value)) return value;
  const matches = value.split(' ');
  return matches[1];
};

const processFlexBasis = (key, value) => {
  if (isNumber(value)) return value;
  const matches = value.split(' ');
  return matches[2];
};

const matchNumber = R.when(
  R.is(String),
  R.compose(
    R.complement(R.isEmpty),
    R.match(/^-?\d*\.?\d*$/),
  ),
);

const castFloat = R.when(matchNumber, v => parseFloat(v, 10));

const transformStyles = style => {
  const propsArray = Object.keys(style);
  const resolvedStyle = {};

  for (let i = 0; i < propsArray.length; i++) {
    const key = propsArray[i];
    const value = style[key];

    resolvedStyle[key] = R.compose(
      castFloat,
      R.cond([
        [isBorderStyle, processBorders],
        [isBoxModelStyle, processBoxModel],
        [isObjectPositionStyle, processObjectPosition],
        [isTransformOriginStyle, processTransformOrigin],
        [isFontWeightStyle, processFontWeight],
        [isFlexGrow, processFlexGrow],
        [isFlexShrink, processFlexShrink],
        [isFlexBasis, processFlexBasis],
        [R.T, R.always(value)],
      ]),
    )(key, value);
  }

  return resolvedStyle;
};

export default transformStyles;
