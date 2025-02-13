import {
  BorderExpandedStyle,
  BorderShorthandStyle,
  BorderStyleValue,
} from '../types';

const BORDER_SHORTHAND_REGEX =
  /(-?\d+(\.\d+)?(in|mm|cm|pt|vw|vh|px|rem)?)\s(\S+)\s(.+)/;

const matchBorderShorthand = (value: string) =>
  value.match(BORDER_SHORTHAND_REGEX) || [];

type BorderShorthandKey = keyof BorderShorthandStyle;

const expandBorders = <K extends BorderShorthandKey>(
  key: K,
  value: BorderShorthandStyle[K],
): BorderExpandedStyle => {
  const match = matchBorderShorthand(`${value}`);

  if (match) {
    const color = match[5] || value;
    const width = match[1] || value;
    const style = (match[4] || `${value}`) as BorderStyleValue;

    if (key.match(/(Top|Right|Bottom|Left)$/)) {
      return {
        [`${key}Color`]: color,
        [`${key}Style`]: style,
        [`${key}Width`]: width,
      };
    }

    if (key.match(/Color$/)) {
      if (typeof color === 'number') {
        throw new Error(`${key} must be a string`);
      }

      return {
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: color,
      };
    }

    if (key.match(/Style$/)) {
      return {
        borderTopStyle: style,
        borderRightStyle: style,
        borderBottomStyle: style,
        borderLeftStyle: style,
      };
    }

    if (key.match(/Width$/)) {
      return {
        borderTopWidth: width,
        borderRightWidth: width,
        borderBottomWidth: width,
        borderLeftWidth: width,
      };
    }

    if (key.match(/Radius$/)) {
      return {
        borderTopLeftRadius: value,
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
        borderBottomLeftRadius: value,
      };
    }

    if (typeof color === 'number') {
      throw new Error(`${key} must be a string`);
    }

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

export default expandBorders;
