import { castArray } from '@react-pdf/fns';
import { TextInstance } from '@react-pdf/primitives';

const isString = value => typeof value === 'string';

const isNumber = value => typeof value === 'number';

const isFragment = value =>
  value && value.type === Symbol.for('react.fragment');

/**
 * Transforms a react element instance to internal element format
 *
 * @param {Object} React element
 * @returns {Object} parsed react element
 */
const createInstance = element => {
  if (!element) return [];

  if (isString(element) || isNumber(element)) {
    return [{ type: TextInstance, value: `${element}` }];
  }

  if (Array.isArray(element)) {
    return element.reduce((acc, el) => acc.concat(createInstance(el)), []);
  }

  if (isFragment(element)) {
    const children = element.children || [];
    return children.reduce(
      (acc, child) => acc.concat(createInstance(child)),
      [],
    );
  }

  if (!isString(element.type)) {
    return createInstance(element.type(element.props));
  }

  const {
    type,
    props: { style = {}, children = [], ...props },
  } = element;

  const nextChildren = castArray(children).reduce(
    (acc, child) => acc.concat(createInstance(child)),
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

export default createInstance;
