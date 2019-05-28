import flatten from './flatten';
import transformStyles from './transformStyles';
import resolveMediaQueries from './resolveMediaQueries';

const create = styles => styles;

const resolve = (styles, container) => {
  if (!styles) return null;

  styles = flatten(styles);
  styles = resolveMediaQueries(styles, container);
  styles = transformStyles(styles, container);

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
