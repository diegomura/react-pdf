import processFlex from './flex';
import {
  processMargin,
  processMarginVertical,
  processMarginHorizontal,
  processMarginSingle,
} from './margins';
import processBorders from './borders';
import {
  processPadding,
  processPaddingVertical,
  processPaddingHorizontal,
  processPaddingSingle,
} from './paddings';
import processObjectPosition from './objectPosition';
import processTransformOrigin from './transformOrigin';
import processGap from './gap';
import { ExpandedStyle, Style, StyleKey } from '../types';
import { Container } from 'react-dom';

const shorthands: Partial<Record<StyleKey, any>> = {
  flex: processFlex,
  gap: processGap,
  margin: processMargin,
  marginHorizontal: processMarginHorizontal,
  marginVertical: processMarginVertical,
  marginTop: processMarginSingle,
  marginRight: processMarginSingle,
  marginBottom: processMarginSingle,
  marginLeft: processMarginSingle,
  padding: processPadding,
  paddingHorizontal: processPaddingHorizontal,
  paddingVertical: processPaddingVertical,
  paddingTop: processPaddingSingle,
  paddingRight: processPaddingSingle,
  paddingBottom: processPaddingSingle,
  paddingLeft: processPaddingSingle,
  border: processBorders,
  borderTop: processBorders,
  borderRight: processBorders,
  borderBottom: processBorders,
  borderLeft: processBorders,
  borderColor: processBorders,
  borderRadius: processBorders,
  borderStyle: processBorders,
  borderWidth: processBorders,
  objectPosition: processObjectPosition,
  transformOrigin: processTransformOrigin,
};

/**
 * Transforms style key-value
 *
 * @param key style key
 * @param value style value
 * @returns Transformed style values
 */
const expandStyle = <K extends StyleKey>(
  key: K,
  value: Style[K],
  container: Container,
) => {
  return shorthands[key]
    ? shorthands[key](key, value, container)
    : { [key]: value };
};

/**
 * Expand the shorthand properties.
 *
 * @param style - Style object
 * @returns Expanded style object
 */
const expand = (container: Container) => (style: Style) => {
  if (!style) return style;

  const propsArray = Object.keys(style) as StyleKey[];
  const resolvedStyle: ExpandedStyle = {};

  for (let i = 0; i < propsArray.length; i += 1) {
    const key = propsArray[i];
    const value = style[key];
    const expanded = expandStyle(key, value, container);
    const keys = Object.keys(expanded);

    for (let j = 0; j < keys.length; j += 1) {
      const propName = keys[j];
      const propValue = expanded[propName];

      resolvedStyle[propName] = propValue;
    }
  }

  return resolvedStyle;
};

export default expand;
