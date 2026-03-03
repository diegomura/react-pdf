import borderHandlers from './borders';
import colorHandlers from './colors';
import dimensionHandlers from './dimensions';
import flexHandlers from './flex';
import gapHandlers from './gap';
import layoutHandlers from './layout';
import marginHandlers from './margins';
import paddingHandlers from './paddings';
import positioningHandlers from './positioning';
import textHandlers from './text';
import transformHandlers from './transform';
import svgHandlers from './svg';
import { Container, SafeStyle, Style, StyleKey } from '../types';

type Handler = (
  key: StyleKey,
  value: any,
  container: Container,
  style: Style,
) => SafeStyle;

const shorthands: Partial<Record<StyleKey, Handler>> = {
  ...borderHandlers,
  ...colorHandlers,
  ...dimensionHandlers,
  ...flexHandlers,
  ...gapHandlers,
  ...layoutHandlers,
  ...marginHandlers,
  ...paddingHandlers,
  ...positioningHandlers,
  ...textHandlers,
  ...transformHandlers,
  ...svgHandlers,
};

/**
 * Expand shorthand properties and resolve units/values.
 *
 * @param container - Container dimensions for unit resolution
 * @returns Function that resolves a style object
 */
const resolve =
  (container: Container) =>
  (style: Style): SafeStyle => {
    const propsArray = Object.keys(style) as StyleKey[];
    const resolvedStyle: SafeStyle = {};

    for (let i = 0; i < propsArray.length; i += 1) {
      const key = propsArray[i];
      const value = style[key];

      if (!shorthands[key]) {
        resolvedStyle[key] = value;
        continue;
      }

      const resolved = shorthands[key](key, value, container, style);

      Object.assign(resolvedStyle, resolved);
    }

    return resolvedStyle;
  };

export default resolve;
