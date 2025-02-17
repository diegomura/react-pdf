import transformUnit from '../utils/units';
import offsetKeyword from '../utils/offsetKeyword';
import { processNoopValue } from './utils';

const processObjectPosition = (key, value, container) => {
  const match = `${value}`.split(' ');

  const objectPositionX = offsetKeyword(
    transformUnit(container, match?.[0] || value),
  );
  const objectPositionY = offsetKeyword(
    transformUnit(container, match?.[1] || value),
  );

  return { objectPositionX, objectPositionY };
};

const processObjectPositionValue = (key, value, container) => ({
  [key]: offsetKeyword(transformUnit(container, value)),
});

const handlers = {
  objectPosition: processObjectPosition,
  objectPositionX: processObjectPositionValue,
  objectPositionY: processObjectPositionValue,
  objectFit: processNoopValue,
};

export default handlers;
