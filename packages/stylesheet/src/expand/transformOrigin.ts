import { TransformExpandedStyle, TransformShorthandStyle } from '../types';

const Y_AXIS_SHORTHANDS = { top: true, bottom: true };

const sortTransformOriginPair = (a: string, b: string) => {
  if (Y_AXIS_SHORTHANDS[a]) return 1;
  if (Y_AXIS_SHORTHANDS[b]) return -1;
  return 0;
};

const getTransformOriginPair = (values: string[]) => {
  if (!values || values.length === 0) return ['center', 'center'];

  const pair = values.length === 1 ? [values[0], 'center'] : values;

  return pair.sort(sortTransformOriginPair);
};

type TransformShorthandKey = keyof TransformShorthandStyle;

const expandTransformOrigin = <K extends TransformShorthandKey>(
  key: K,
  value: TransformShorthandStyle[K],
): TransformExpandedStyle => {
  const match = `${value}`.split(' ');

  const pair = getTransformOriginPair(match);

  return {
    transformOriginX: pair[0],
    transformOriginY: pair[1],
  };
};

export default expandTransformOrigin;
