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
import { ExpandedStyle, Style } from '../types';

type StyleKey = keyof Style;

const shorthands = {
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

const expandStyle = <K extends StyleKey>(key: K, value: Style[K]) => {
  // @ts-ignore
  return key in shorthands ? shorthands[key](key, value) : { [key]: value };
};

/**
 * Expand the shorthand properties.
 *
 * @param style - Style object
 * @returns Expanded style object
 */
const expand = (style: Style) => {
  if (!style) return style;

  const propsArray = Object.keys(style) as StyleKey[];
  const resolvedStyle: ExpandedStyle = {};

  for (let i = 0; i < propsArray.length; i += 1) {
    const key = propsArray[i];
    const value = style[key];
    const extended = expandStyle(key, value);
    const keys = Object.keys(extended);

    for (let j = 0; j < keys.length; j += 1) {
      const propName = keys[j];
      const propValue = extended[propName];

      resolvedStyle[propName] = propValue;
    }
  }

  return resolvedStyle;
};

export default expand;
