import transformUnit from '../utils/units';
import offsetKeyword from '../utils/offsetKeyword';
import { processNoopValue } from './utils';
import { Container, Style, StyleKey } from '../types';

const processObjectPosition = <K extends StyleKey>(
  key: K,
  value: Style[K],
  container: Container,
) => {
  const match = `${value}`.split(' ');

  const objectPositionX = offsetKeyword(
    transformUnit(container, match?.[0] || value),
  );
  const objectPositionY = offsetKeyword(
    transformUnit(container, match?.[1] || value),
  );
  return { objectPositionX, objectPositionY };
};

const processObjectPositionValue = <K extends StyleKey>(
  key: K,
  value: Style[K],
  container: Container,
) => ({
  [key]: offsetKeyword(transformUnit(container, value)),
});

const handlers = {
  objectPosition: processObjectPosition<'objectPosition'>,
  objectPositionX: processObjectPositionValue<'objectPositionX'>,
  objectPositionY: processObjectPositionValue<'objectPositionY'>,
  objectFit: processNoopValue<'objectFit'>,
};

export default handlers;
