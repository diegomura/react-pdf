import {
  processColorValue,
  processNoopValue,
  processNumberValue,
  processUnitValue,
} from './utils';

import { matchPercent } from '@react-pdf/fns';

import castInt from '../utils/castInt';
import transformUnit from '../utils/units';
import { Container, FontWeight, Style, StyleKey } from '../types';

const DEFAULT_FONT_SIZE = 18;

const FONT_WEIGHTS: Record<string, number> = {
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

const transformFontWeight = (value: FontWeight): number => {
  if (!value) return FONT_WEIGHTS.normal;
  if (typeof value === 'number') return value;

  const lv = value.toLowerCase();

  if (lv in FONT_WEIGHTS) return FONT_WEIGHTS[lv];

  return castInt(value);
};

const processFontWeight = <K extends StyleKey>(key: K, value: Style[K]) => {
  return { [key]: transformFontWeight(value as FontWeight) };
};

const transformLineHeight = (
  value: Style['lineHeight'],
  styles: Style,
  container: Container,
): string | number => {
  if (value === '') return value;

  const fontSize = transformUnit(
    container,
    styles.fontSize || DEFAULT_FONT_SIZE,
  ) as number;
  const lineHeight = transformUnit(container, value) as number;

  // Percent values: use this number multiplied by the element's font size
  const { percent } = matchPercent(lineHeight) || {};
  if (percent) return percent * fontSize;

  // Unitless values: use this number multiplied by the element's font size
  return isNaN(Number(value)) ? lineHeight : lineHeight * fontSize;
};

const processLineHeight = <K extends StyleKey>(
  key: K,
  value: Style[K],
  container: Container,
  styles: Style,
) => {
  return {
    [key]: transformLineHeight(value, styles, container),
  };
};

const handlers = {
  direction: processNoopValue<'direction'>,
  fontFamily: processNoopValue<'fontFamily'>,
  fontSize: processUnitValue<'fontSize'>,
  fontStyle: processNoopValue<'fontStyle'>,
  fontWeight: processFontWeight<'fontWeight'>,
  letterSpacing: processUnitValue<'letterSpacing'>,
  lineHeight: processLineHeight<'lineHeight'>,
  maxLines: processNumberValue<'maxLines'>,
  textAlign: processNoopValue<'textAlign'>,
  textDecoration: processNoopValue<'textDecoration'>,
  textDecorationColor: processColorValue<'textDecorationColor'>,
  textDecorationStyle: processNoopValue<'textDecorationStyle'>,
  textIndent: processNoopValue<'textIndent'>,
  textOverflow: processNoopValue<'textOverflow'>,
  textTransform: processNoopValue<'textTransform'>,
  verticalAlign: processNoopValue<'verticalAlign'>,
};

export default handlers;
