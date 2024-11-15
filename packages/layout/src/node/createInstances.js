import { castArray } from '@react-pdf/fns';
import { TextInstance, Image } from '@react-pdf/primitives';
import flatten from 'lodash.flatten';

import fetchImage from '../image/fetchImage';

const isString = (value) => typeof value === 'string';

const isNumber = (value) => typeof value === 'number';

const isImage = value => value.type === Image;

const isFragment = value =>
  value && value.type === Symbol.for('react.fragment');

/**
 * Transforms a react element instance to internal element format.
 *
 * Can return multiple instances in the case of arrays or fragments.
 *
 * @param {Object} element React element
 * @returns {Object[]} parsed React elements
 */
const createInstances = async element => {
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

  if (isImage(element)) {
    const node = { props, type, style, box: {} };
    await fetchImage(node);
    return [node];
  }

  const instances = await Promise.all(
    castArray(children).map(child => createInstances(child)),
  );
  const nextChildren = flatten(instances);

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
