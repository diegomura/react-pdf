import transformColor from '../utils/colors';
import transformUnit from '../utils/units';
import {
  Container,
  BorderSafeStyle,
  BorderStyle,
  BorderStyleValue,
} from '../types';
import { processColorValue, processNoopValue, processUnitValue } from './utils';

// Matches border shorthand: "width style color" (e.g., "1px solid red")
const BORDER_SHORTHAND_REGEX =
  /^(?<width>-?\d+(?:\.\d+)?(?:in|mm|cm|pt|vw|vh|px|rem)?)\s+(?<style>\S+)\s+(?<color>.+)$/;

const matchBorderShorthand = (value: string) =>
  BORDER_SHORTHAND_REGEX.exec(value);

type BorderKey = keyof BorderStyle;

const resolveBorderShorthand = <K extends BorderKey>(
  key: K,
  value: BorderStyle[K],
  container: Container,
): BorderSafeStyle => {
  const match = matchBorderShorthand(`${value}`);

  // Handle shorthand properties that don't match the full border pattern
  // (e.g., borderColor: 'red', borderWidth: 5, borderRadius: 10)
  if (!match) {
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
  }

  // Full border shorthand matched: "width style color"
  const {
    width: widthMatch,
    style: styleMatch,
    color: colorMatch,
  } = match.groups!;

  const style = styleMatch as BorderStyleValue;
  const color = transformColor(colorMatch);
  const width = transformUnit(container, widthMatch);

  if (key.match(/(Top|Right|Bottom|Left)$/)) {
    return {
      [`${key}Color`]: color,
      [`${key}Style`]: style,
      [`${key}Width`]: width,
    };
  }

  if (typeof width !== 'number')
    throw new Error(`Invalid border width: ${width}`);

  if (typeof style === 'number')
    throw new Error(`Invalid border style: ${style}`);

  return {
    borderTopColor: color,
    borderTopStyle: style,
    borderTopWidth: width,
    borderRightColor: color,
    borderRightStyle: style,
    borderRightWidth: width,
    borderBottomColor: color,
    borderBottomStyle: style,
    borderBottomWidth: width,
    borderLeftColor: color,
    borderLeftStyle: style,
    borderLeftWidth: width,
  };
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
