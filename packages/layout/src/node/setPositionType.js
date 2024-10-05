import * as Yoga from 'yoga-layout/load';
import { isNil } from '@react-pdf/fns';

const POSITION = {
  absolute: Yoga.PositionType.Absolute,
  relative: Yoga.PositionType.Relative,
  static: Yoga.PositionType.Static,
};

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set position type attribute to node's Yoga instance
 *
 * @param {string} value position position type
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
const setPositionType = (value) => (node) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setPositionType(POSITION[value]);
  }

  return node;
};

export default setPositionType;
