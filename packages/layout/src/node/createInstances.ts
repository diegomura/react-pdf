import { castArray } from '@react-pdf/fns';
import * as P from '@react-pdf/primitives';
import React from 'react';

import { Node } from '../types';

const isString = (value: any): value is string => typeof value === 'string';

const isNumber = (value: any): value is number => typeof value === 'number';

const isBoolean = (value: any): value is boolean => typeof value === 'boolean';

const isFragment = (value: any): value is React.ReactFragment =>
  value && value.type === Symbol.for('react.fragment');

/**
 * Transforms a react element instance to internal element format.
 *
 * Can return multiple instances in the case of arrays or fragments.
 *
 * @param element - React element
 * @returns Parsed React elements
 */
const createInstances = (element: React.ReactNode): Node[] => {
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

  if (isFragment(element)) {
    // @ts-expect-error figure out why this is complains
    return createInstances(element.props.children);
  }

  if (!isString(element.type)) {
    // @ts-expect-error figure out why this is complains
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
  ] as Node[];
};

export default createInstances;
