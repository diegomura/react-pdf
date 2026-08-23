import { castArray } from '@react-pdf/fns';
import * as P from '@react-pdf/primitives';

const isString = (value) => typeof value === 'string';

const isNumber = (value) => typeof value === 'number';

const isBoolean = (value) => typeof value === 'boolean';

const isReactFragment = (value) =>
  value && value.type === Symbol.for('react.fragment');

/**
 * Transforms a react element instance to internal element format.
 *
 * Can return multiple instances in the case of arrays or fragments.
 *
 * @param element - React element
 * @returns Parsed React elements
 */
const createInstances = (element) => {
  if (!element) return [];

  if (Array.isArray(element)) {
    return element.reduce((acc, el) => acc.concat(createInstances(el)), []);
  }

  if (isBoolean(element)) {
    return [];
  }

  if (isString(element) || isNumber(element)) {
    return [{ type: P.TextInstance, value: `${element}` }];
  }

  if (isReactFragment(element)) {
    return createInstances(element.props.children);
  }

  // Already-created instances ride through untouched — they carry
  // style/children at the top level and must not be re-destructured.
  if (element.type === P.Fragment) {
    return [element.props.node];
  }

  if (!isString(element.type)) {
    return createInstances(element.type(element.props));
  }

  const {
    type,
    props: { style = {}, children, ...props },
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
      children: nextChildren,
    },
  ];
};

export default createInstances;
