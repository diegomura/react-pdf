import flatten from './flatten';

const create = styles => styles;

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
  flatten,
  absoluteFillObject,
};
