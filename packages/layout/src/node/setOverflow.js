import { isNil } from '@react-pdf/fns';
import Yoga from '../../yoga';

const OVERFLOW = {
  hidden: Yoga.OVERFLOW_HIDDEN,
  scroll: Yoga.OVERFLOW_SCROLL,
};

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set overflow attribute to node's Yoga instance
 *
 * @param {string} value overflow value
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
const setOverflow = value => node => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    const overflow = OVERFLOW[value] || Yoga.OVERFLOW_VISIBLE;
    yogaNode.setOverflow(overflow);
  }

  return node;
};

export default setOverflow;
