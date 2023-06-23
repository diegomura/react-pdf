import { castArray } from '@nutshelllabs/fns';
import { TextInstance } from '@nutshelllabs/primitives';

const isString = value => typeof value === 'string';

const isNumber = value => typeof value === 'number';

const isFragment = value =>
  value && value.type === Symbol.for('react.fragment');

/**
 * Transforms a react element instance to internal element format.
 *
 * Can return multiple instances in the case of arrays or fragments.
 *
 * @param {Object} React element
 * @returns {Array} parsed react elements
 */
const createInstances = element => {
  if (!element) return [];

  if (isString(element) || isNumber(element)) {
    return [{ type: TextInstance, value: `${element}` }];
  }

  if (isFragment(element)) {
    return createInstances(element.props.children);
  }

  if (Array.isArray(element)) {
    return element.reduce((acc, el) => acc.concat(createInstances(el)), []);
  }

  if (!isString(element.type)) {
    return createInstances(element.type(element.props));
  }

  const {
    type,
    props: { style = {}, children = [], ...props },
  } = element;

  const nextChildren = castArray(children).reduce(
    (acc, child) => acc.concat(createInstances(child)),
    [],
  );

  return [
    {
      type,
      style,
      props,
      box: {},
      children: nextChildren,
    },
  ];
};

export default createInstances;
