import * as R from 'ramda';
import { TextInstance } from '@govind-react-pdf/primitives';

import castArray from '../utils/castArray';

const isString = R.is(String);

const isNumber = R.is(Number);

const isNotString = R.complement(isString);

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

  if (isNotString(element.type))
    return createInstance(element.type(element.props));

  const {
    type,
    props: { style = {}, children = [], ...props },
  } = element;

  const nextChildren = R.compose(R.map(createInstance), castArray)(children);

  return {
    type,
    style,
    props,
    box: {},
    children: nextChildren,
  };
};

export default createInstance;
