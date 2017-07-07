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

const resolve = styles => {
  if (!styles) {
    return null;
  }

  styles = flatten(styles);

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
