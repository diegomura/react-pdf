import transformColor from '../utils/colors';
import transformUnit, { VALUE_REGEX } from '../utils/units';
import {
  Container,
  BorderSafeStyle,
  BorderStyle,
  BorderStyleValue,
} from '../types';
import { processColorValue, processNoopValue, processUnitValue } from './utils';

// CSS border styles. Unsupported ones render as solid, and "none" or
// "hidden" remove the border
const BORDER_STYLES = new Map<string, BorderStyleValue | 'none'>([
  ['solid', 'solid'],
  ['dashed', 'dashed'],
  ['dotted', 'dotted'],
  ['double', 'solid'],
  ['groove', 'solid'],
  ['ridge', 'solid'],
  ['inset', 'solid'],
  ['outset', 'solid'],
  ['none', 'none'],
  ['hidden', 'none'],
]);

// Splits on whitespace, keeping functional colors like "rgb(0, 0, 0)" whole
const BORDER_TOKEN_REGEX = /[^\s(]+(?:\([^)]*\))?/g;

// Parses border shorthand parts in any order (e.g., "solid 1px red")
const parseBorderShorthand = (value: string) => {
  const tokens = value.match(BORDER_TOKEN_REGEX) || [];

  if (tokens.length === 0) return null;

  let width: string | undefined;
  let style: BorderStyleValue | 'none' | undefined;
  let color: string | undefined;

  for (const token of tokens) {
    const tokenStyle = BORDER_STYLES.get(token.toLowerCase());

    if (VALUE_REGEX.test(token)) {
      if (width) return null;
      width = token;
    } else if (tokenStyle) {
      if (style) return null;
      style = tokenStyle;
    } else {
      if (color) return null;
      color = token;
    }
  }

  if (style === 'none') return { width: '0', color };

  return { width, style, color };
};

type BorderKey = keyof BorderStyle;

const SIDES = [
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
] as const;

type Side = (typeof SIDES)[number];

const isSide = (key: string): key is Side =>
  (SIDES as readonly string[]).includes(key);

// Resolves single-value props (e.g., borderColor: 'red', borderWidth: 5,
// borderRadius: 10)
const resolveSingleValue = <K extends BorderKey>(
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
    const radius = transformUnit(container, value);

    if (typeof radius !== 'number')
      throw new Error(`Invalid border radius: ${radius}`);

    return {
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      borderBottomLeftRadius: radius,
    };
  }

  return { [key]: value };
};

// Resolves border shorthands: any of width, style and color, in any order.
// Omitted parts are left unset so other border styles still apply.
const resolveBorderShorthand = <K extends BorderKey>(
  key: K,
  value: BorderStyle[K],
  container: Container,
): BorderSafeStyle => {
  const parts = parseBorderShorthand(`${value}`);
  const isFullShorthand = !!(parts?.width && parts.style && parts.color);

  // Single-value props keep their own parsing, unless given a full
  // "width style color" border
  if (key !== 'border' && !isSide(key) && !isFullShorthand)
    return resolveSingleValue(key, value, container);

  if (!parts) return { [key]: value };

  const sides: readonly Side[] = isSide(key) ? [key] : SIDES;

  const width =
    parts.width !== undefined
      ? transformUnit(container, parts.width)
      : undefined;
  const color =
    parts.color !== undefined ? transformColor(parts.color) : undefined;

  if (typeof width === 'string')
    throw new Error(`Invalid border width: ${width}`);

  const result: BorderSafeStyle = {};

  for (const side of sides) {
    if (width !== undefined) result[`${side}Width`] = width;
    if (parts.style !== undefined) result[`${side}Style`] = parts.style;
    if (color !== undefined) result[`${side}Color`] = color;
  }

  return result;
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
