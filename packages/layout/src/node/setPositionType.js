import { isNil } from '@react-pdf/fns';
import Yoga from '../../yoga';

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
        ? Yoga.POSITION_TYPE_ABSOLUTE
        : Yoga.POSITION_TYPE_RELATIVE,
    );
  }

  return node;
};

export default setPositionType;
