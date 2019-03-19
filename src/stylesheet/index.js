import matchMedia from 'media-engine';
import transformStyles from './transformStyles';

const create = styles => styles;

const flatten = input => {
  if (!Array.isArray(input)) {
    input = [input];
  }

  const result = input.reduce((acc, style) => {
    if (style) {
      const s = Array.isArray(style) ? flatten(style) : style;

      Object.keys(s).forEach(key => {
        if (s[key] !== null && s[key] !== undefined) {
          acc[key] = s[key];
        }
      });
    }

    return acc;
  }, {});

  return result;
};

const resolveMediaQueries = (input, container) => {
  const result = Object.keys(input).reduce((acc, key) => {
    if (/@media/.test(key)) {
      return {
        ...acc,
        ...matchMedia({ [key]: input[key] }, container),
      };
    }

    return { ...acc, [key]: input[key] };
  }, {});

  return result;
};

const resolve = (styles, container, options) => {
  if (!styles) return null;

  styles = flatten(styles);
  styles = resolveMediaQueries(styles, container);
  styles = transformStyles(styles, options);

  return styles;
};

const absoluteFillObject = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export default {
  hairlineWidth: 1,
  create,
  resolve,
  flatten,
  absoluteFillObject,
};
