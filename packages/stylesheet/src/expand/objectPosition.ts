import { PositionExpandedStyle, PositionShorthandStyle } from '../types';

type ObjectPositionShorthandKey = keyof PositionShorthandStyle;

const expandObjectPosition = <K extends ObjectPositionShorthandKey>(
  key: K,
  value: PositionShorthandStyle[K],
): PositionExpandedStyle => {
  const match = `${value}`.split(' ');

  return {
    objectPositionX: match?.[0] || value,
    objectPositionY: match?.[1] || value,
  };
};

export default expandObjectPosition;
