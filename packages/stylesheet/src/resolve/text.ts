import {
  processColorValue,
  processNoopValue,
  processNumberValue,
  processUnitValue,
} from './utils';

import { matchPercent } from '@react-pdf/fns';

import castInt from '../utils/castInt';
import transformUnit from '../utils/units';

const FONT_WEIGHTS = {
  thin: 100,
  hairline: 100,
  ultralight: 200,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  ultrabold: 800,
  extrabold: 800,
  heavy: 900,
  black: 900,
};

const transformFontWeight = (value) => {
  if (!value) return FONT_WEIGHTS.normal;
  if (typeof value === 'number') return value;

  const lv = value.toLowerCase();

  if (FONT_WEIGHTS[lv]) return FONT_WEIGHTS[lv];

  return castInt(value);
};

const processFontWeight = (key, value) => {
  return { [key]: transformFontWeight(value) };
};

const transformLineHeight = (value, styles, container) => {
  if (value === '') return value;

  const fontSize = transformUnit(container, styles.fontSize || 18) as number;
  const lineHeight = transformUnit(container, value) as number;

  // Percent values: use this number multiplied by the element's font size
  const { percent } = matchPercent(lineHeight) || {};
  if (percent) return percent * fontSize;

  // Unitless values: use this number multiplied by the element's font size
  return isNaN(value) ? lineHeight : lineHeight * fontSize;
};

const processLineHeight = (key, value, container, styles) => {
  return {
    [key]: transformLineHeight(value, styles, container),
  };
};

const handlers = {
  fontFamily: processNoopValue,
  fontSize: processUnitValue,
  fontStyle: processNoopValue,
  fontWeight: processFontWeight,
  letterSpacing: processUnitValue,
  lineHeight: processLineHeight,
  maxLines: processNumberValue,
  textAlign: processNoopValue,
  textDecoration: processNoopValue,
  textDecorationColor: processColorValue,
  textDecorationStyle: processNoopValue,
  textIndent: processNoopValue,
  textOverflow: processNoopValue,
  textTransform: processNoopValue,
  verticalAlign: processNoopValue,
};

export default handlers;
