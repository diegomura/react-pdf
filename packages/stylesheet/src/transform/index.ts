import transformUnits from './units';
import transformColor from './colors';
import processTransform from './transform';
import processFontWeight from './fontWeight';
import processLineHeight from './lineHeight';
import processObjectPosition from './objectPosition';
import processTransformOrigin from './transformOrigin';
import castFloat from '../utils/castFloat';
import { Container, ExpandedStyle, SafeStyle } from '../types';

type ExpandedStyleKey = keyof ExpandedStyle;

const handlers = {
  transform: processTransform,
  fontWeight: processFontWeight,
  lineHeight: processLineHeight,
  objectPositionX: processObjectPosition,
  objectPositionY: processObjectPosition,
  transformOriginX: processTransformOrigin,
  transformOriginY: processTransformOrigin,
};

const transformStyle = <K extends ExpandedStyleKey>(
  key: K,
  value: ExpandedStyle[K],
  styles: ExpandedStyle,
  container: Container,
) => {
  // @ts-ignore
  const result = key in handlers ? handlers[key](value, styles) : value;

  return transformColor(transformUnits(container, castFloat(result)));
};

/**
 * @param style - Styles object
 * @returns Transformed styles
 */

/**
 * Transform styles values
 *
 * @param container - Container for which styles are resolved
 * @returns Style with transformed values
 */
const transform = (container: Container) => (styles: ExpandedStyle) => {
  const propsArray = Object.keys(styles) as ExpandedStyleKey[];
  const resolvedStyle: SafeStyle = {};

  for (let i = 0; i < propsArray.length; i += 1) {
    const key = propsArray[i];
    const value = styles[key];
    const transformed = transformStyle(key, value, styles, container);

    // @ts-ignore
    resolvedStyle[key] = transformed;
  }

  return resolvedStyle;
};

export default transform;
