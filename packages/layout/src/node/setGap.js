import Yoga from '@react-pdf/yoga';
import { isNil } from '@react-pdf/fns';

/**
 * Set rowGap value to node's Yoga instance
 *
 * @param {Number} gap value
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setRowGap = value => node => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setGap(Yoga.GUTTER_ROW, value);
  }

  return node;
};

/**
 * Set rowGap value to node's Yoga instance
 *
 * @param {Number} gap value
 * @param {Object} node instance
 * @return {Object} node instance
 */
export const setColumnGap = value => node => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setGap(Yoga.GUTTER_COLUMN, value);
  }

  return node;
};
