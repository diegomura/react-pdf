import * as R from 'ramda';

import { castFloat } from './utils';

const OBJECT_POSITION_REGEX = /-?\d+(\.\d+)?(px|in|mm|cm|pt|%|vw|vh|px)?/g;

const matchObjectPosition = R.match(OBJECT_POSITION_REGEX);

const processObjectPosition = (key, value) => {
  const match = matchObjectPosition(value);

  return {
    objectPositionX: castFloat(match?.[0] || value),
    objectPositionY: castFloat(match?.[1] || value),
  };
};

export default processObjectPosition;
