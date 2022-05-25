import { TextInstance } from '@react-pdf/primitives';

import castArray from '../../../fns/castArray';

const isString = value => typeof value === 'string';

const isNumber = value => typeof value === 'number';

/**
 * Transforms a react element instance to internal element format
 *
 * @param {Object} React element
 * @returns {Object} parsed react element
 */
const createInstance = element => {
  if (!element) return null;

  if (isString(element) || isNumber(element))
    return { type: TextInstance, value: `${element}` };

  if (!isString(element.type))
    return createInstance(element.type(element.props));

  const {
    type,
    props: { style = {}, children = [], ...props },
  } = element;

  const nextChildren = castArray(children).map(createInstance);

  return {
    type,
    style,
    props,
    box: {},
    children: nextChildren,
  };
};

export default createInstance;
