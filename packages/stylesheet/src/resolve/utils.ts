import transformUnit from '../utils/units';
import transformColor from '../utils/colors';
import { Container, Style, StyleKey } from '../types';

export const processNumberValue = <K extends StyleKey>(
  key: K,
  value: Style[K],
) =>
  ({
    [key]: parseFloat(value),
  }) as const;

export const processUnitValue = <K extends StyleKey>(
  key: K,
  value: Style[K],
  container: Container,
) => ({
  [key]: transformUnit(container, value),
});

export const processColorValue = <K extends StyleKey>(
  key: K,
  value: Style[K],
) => {
  const result = { [key]: transformColor(value) };
  return result as { [P in K]: string };
};

export const processNoopValue = <K extends StyleKey>(
  key: K,
  value: Style[K],
) => ({
  [key]: value,
});
