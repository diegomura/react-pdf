import * as Yoga from 'yoga-layout/load';
import { isNil } from '@react-pdf/fns';

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set rowGap value to node's Yoga instance
 *
 * @param {number} value gap value
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
export const setRowGap = (value) => (node) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setGap(Yoga.Gutter.Row, value);
  }

  return node;
};

/**
 * Set columnGap value to node's Yoga instance
 *
 * @param {number} value gap value
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
export const setColumnGap = (value) => (node) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setGap(Yoga.Gutter.Column, value);
  }

  return node;
};
