import * as Yoga from 'yoga-layout/load';
import { isNil } from '@react-pdf/fns';

import { SafeNode } from '../types';

/**
 * Set rowGap value to node's Yoga instance
 *
 * @param value - Gap value
 * @returns Node instance wrapper
 */
export const setRowGap = (value: number) => (node: SafeNode) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setGap(Yoga.Gutter.Row, value);
  }

  return node;
};

/**
 * Set columnGap value to node's Yoga instance
 *
 * @param value - Gap value
 * @returns Node instance wrapper
 */
export const setColumnGap = (value: number) => (node: SafeNode) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setGap(Yoga.Gutter.Column, value);
  }

  return node;
};
