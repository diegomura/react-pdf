import * as R from 'ramda';

const BORDER_SHORTHAND_REGEX = /(-?\d+(\.\d+)?(px|in|mm|cm|pt|vw|vh|px)?)\s(\S+)\s(.+)/;

const matchBorderShorthand = R.match(BORDER_SHORTHAND_REGEX);

const expandBorders = (key, value) => {
  const match = matchBorderShorthand(`${value}`);

  if (match) {
    const color = match[5] || value;
    const style = match[4] || value;
    const width = match[1] || value;
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

  return value;
};

export default expandBorders;
