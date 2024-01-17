import * as Yoga from 'yoga-layout';
import { isNil } from '@react-pdf/fns';

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
const setPositionType = value => node => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setPositionType(
      value === 'absolute'
        ? Yoga.PositionType.Absolute
        : Yoga.PositionType.Relative,
    );
  }

  return node;
};

export default setPositionType;
