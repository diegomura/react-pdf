import * as R from 'ramda';

import castArray from '../utils/castArray';
import { TEXT_INSTANCE } from '../constants';

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
  if (isString(element) || isNumber(element))
    return { type: TEXT_INSTANCE, value: `${element}` };

  if (isNotString(element.type))
    return createInstance(element.type(element.props));

  const {
    type,
    props: { style = {}, children = [], ...props },
  } = element;

  const nextChildren = R.compose(
    R.map(createInstance),
    castArray,
  )(children);

  return {
    type,
    style,
    props,
    box: {},
    children: nextChildren,
  };
};

export default createInstance;
