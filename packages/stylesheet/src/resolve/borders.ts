import transformColor from '../utils/colors';
import transformUnit from '../utils/units';
import {
  Container,
  BorderSafeStyle,
  BorderStyle,
  BorderStyleValue,
} from '../types';
import { processColorValue, processNoopValue, processUnitValue } from './utils';

const BORDER_SHORTHAND_REGEX =
  /(-?\d+(\.\d+)?(in|mm|cm|pt|vw|vh|px|rem)?)\s(\S+)\s(.+)/;

const matchBorderShorthand = (value: string) =>
  value.match(BORDER_SHORTHAND_REGEX) || [];

type BorderKey = keyof BorderStyle;

const resolveBorderShorthand = <K extends BorderKey>(
  key: K,
  value: BorderStyle[K],
  container: Container,
): BorderSafeStyle => {
  const match = matchBorderShorthand(`${value}`);

  if (match) {
    const widthMatch = match[1] || value;
    const styleMatch = match[4] || value;
    const colorMatch = match[5] || value;

    const style = styleMatch as BorderStyleValue;
    const color = colorMatch ? transformColor(colorMatch as string) : undefined;
    const width = widthMatch ? transformUnit(container, widthMatch) : undefined;

    if (key.match(/(Top|Right|Bottom|Left)$/)) {
      return {
        [`${key}Color`]: color,
        [`${key}Style`]: style,
        [`${key}Width`]: width,
      };
    }

    if (key.match(/Color$/)) {
      return {
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: color,
      };
    }

    if (key.match(/Style$/)) {
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
      const radius = value ? transformUnit(container, value) : undefined;

      if (typeof radius !== 'number')
        throw new Error(`Invalid border radius: ${radius}`);

      return {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
        borderBottomLeftRadius: radius,
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
  }

  return { [key]: value };
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
