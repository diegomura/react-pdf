import matchMedia from 'media-engine';
import transformStyles from './transformStyles';

const create = styles => styles;

const flatten = input => {
  if (!Array.isArray(input)) {
    input = [input];
  }

  const result = input.reduce((acc, style) => {
    if (style) {
      Object.keys(style).forEach(key => {
        if (style[key]) {
          acc[key] = style[key];
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

const resolve = (styles, container) => {
  if (!styles) {
    return null;
  }

  styles = flatten(styles);
  styles = resolveMediaQueries(styles, container);

  return transformStyles(styles);
};

const absoluteFillObject = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

module.exports = {
  hairlineWidth: 1,
  create,
  resolve,
  flatten,
  absoluteFillObject,
};
