import * as Yoga from 'yoga-layout/load';
import { isNil, matchPercent } from '@react-pdf/fns';

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Check if value is a percentage and throw error if so
 *
 * @param {string} attr property
 * @param {unknown} value
 * @returns {void}
 */
const checkPercents = (attr, value) => {
  const percent = matchPercent(value);

  if (percent) {
    throw new Error(`You can't pass percentage values to ${attr} property`);
  }
};

/**
 * Set rowGap value to node's Yoga instance
 *
 * @param {number} value gap value
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
export const setRowGap = (value) => (node) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    checkPercents('rowGap', value);
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
    checkPercents('columnGap', value);
    yogaNode.setGap(Yoga.Gutter.Column, value);
  }

  return node;
};
