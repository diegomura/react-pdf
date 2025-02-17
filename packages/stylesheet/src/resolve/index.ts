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

const shorthands: Record<StyleKey, any> = {
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
 * Expand the shorthand properties.
 *
 * @param style - Style object
 * @returns Expanded style object
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
      const keys = Object.keys(resolved);

      for (let j = 0; j < keys.length; j += 1) {
        const propName = keys[j];
        const propValue = resolved[propName];

        resolvedStyle[propName] = propValue;
      }
    }

    return resolvedStyle;
  };

export default resolve;
