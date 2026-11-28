import { matchPercent } from '@react-pdf/fns';
import transformColor from '../utils/colors';
import transformUnit from '../utils/units';
import {
  Container,
  BorderSafeStyle,
  BorderStyle,
  BorderStyleValue,
  Percentage,
} from '../types';
import { processColorValue, processNoopValue, processUnitValue } from './utils';

const BORDER_STYLES = ['dashed', 'dotted', 'solid'];

const BORDER_WIDTH_REGEX = /^-?\d+(?:\.\d+)?(?:in|mm|cm|pt|vw|vh|px|rem)?$/;

// Keeps functional colors like "rgb(1, 2, 3)" as a single token
const BORDER_TOKEN_REGEX = /[^\s(]+(?:\([^)]*\))?/g;

type BorderParts = {
  width?: string | number;
  style?: BorderStyleValue;
  color?: string;
};

const parseBorderShorthand = (value: string | number): BorderParts => {
  if (typeof value === 'number') return { width: value };

  const tokens = `${value}`.match(BORDER_TOKEN_REGEX) || [];
  const parts: BorderParts = {};

  for (const token of tokens) {
    if (BORDER_STYLES.includes(token)) parts.style = token as BorderStyleValue;
    else if (BORDER_WIDTH_REGEX.test(token)) parts.width = token;
    else parts.color = token;
  }

  return parts;
};

type BorderKey = keyof BorderStyle;

const resolveBorderShorthand = <K extends BorderKey>(
  key: K,
  value: BorderStyle[K],
  container: Container,
): BorderSafeStyle => {
  if (key.match(/Color$/)) {
    const color = transformColor(`${value}`);
    return {
      borderTopColor: color,
      borderRightColor: color,
      borderBottomColor: color,
      borderLeftColor: color,
    };
  }

  if (key.match(/Style$/)) {
    const style = value as BorderStyleValue;

    if (typeof style === 'number')
      throw new Error(`Invalid border style: ${style}`);

    return {
      borderTopStyle: style,
      borderRightStyle: style,
      borderBottomStyle: style,
      borderLeftStyle: style,
    };
  }

  if (key.match(/Width$/)) {
    const width = transformUnit(container, value);

    if (typeof width !== 'number')
      throw new Error(`Invalid border width: ${width}`);

    return {
      borderTopWidth: width,
      borderRightWidth: width,
      borderBottomWidth: width,
      borderLeftWidth: width,
    };
  }

  if (key.match(/Radius$/)) {
    const radius = transformUnit(container, value) as number | Percentage;

    // Percentages are resolved against the box later on, in layout
    if (typeof radius !== 'number' && !matchPercent(radius))
      throw new Error(`Invalid border radius: ${radius}`);

    return {
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      borderBottomLeftRadius: radius,
    };
  }

  const {
    width: widthPart,
    style,
    color: colorPart,
  } = parseBorderShorthand(value as string | number);

  const color = colorPart ? transformColor(colorPart) : undefined;
  const width =
    widthPart === undefined ? undefined : transformUnit(container, widthPart);

  if (width !== undefined && typeof width !== 'number')
    throw new Error(`Invalid border width: ${width}`);

  const sides = key.match(/(Top|Right|Bottom|Left)$/)
    ? [key]
    : ['borderTop', 'borderRight', 'borderBottom', 'borderLeft'];

  const result: Record<string, unknown> = {};

  for (const side of sides) {
    if (color !== undefined) result[`${side}Color`] = color;
    if (style !== undefined) result[`${side}Style`] = style;
    if (width !== undefined) result[`${side}Width`] = width;
  }

  return result as BorderSafeStyle;
};

const handlers = {
  border: resolveBorderShorthand<'border'>,
  borderBottom: resolveBorderShorthand<'borderBottom'>,
  borderBottomColor: processColorValue<'borderBottomColor'>,
  borderBottomLeftRadius: processUnitValue<'borderBottomLeftRadius'>,
  borderBottomRightRadius: processUnitValue<'borderBottomRightRadius'>,
  borderBottomStyle: processNoopValue<'borderBottomStyle'>,
  borderBottomWidth: processUnitValue<'borderBottomWidth'>,
  borderColor: resolveBorderShorthand<'borderColor'>,
  borderLeft: resolveBorderShorthand<'borderLeft'>,
  borderLeftColor: processColorValue<'borderLeftColor'>,
  borderLeftStyle: processNoopValue<'borderLeftStyle'>,
  borderLeftWidth: processUnitValue<'borderLeftWidth'>,
  borderRadius: resolveBorderShorthand<'borderRadius'>,
  borderRight: resolveBorderShorthand<'borderRight'>,
  borderRightColor: processColorValue<'borderRightColor'>,
  borderRightStyle: processNoopValue<'borderRightStyle'>,
  borderRightWidth: processUnitValue<'borderRightWidth'>,
  borderStyle: resolveBorderShorthand<'borderStyle'>,
  borderTop: resolveBorderShorthand<'borderTop'>,
  borderTopColor: processColorValue<'borderTopColor'>,
  borderTopLeftRadius: processUnitValue<'borderTopLeftRadius'>,
  borderTopRightRadius: processUnitValue<'borderTopRightRadius'>,
  borderTopStyle: processNoopValue<'borderTopStyle'>,
  borderTopWidth: processUnitValue<'borderTopWidth'>,
  borderWidth: resolveBorderShorthand<'borderWidth'>,
};

export default handlers;
