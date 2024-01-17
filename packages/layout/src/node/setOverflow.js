import * as Yoga from 'yoga-layout';
import { isNil } from '@react-pdf/fns';

const OVERFLOW = {
  hidden: Yoga.Overflow.Hidden,
  scroll: Yoga.Overflow.Scroll,
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
    const overflow = OVERFLOW[value] || Yoga.Overflow.Visible;
    yogaNode.setOverflow(overflow);
  }

  return node;
};

export default setOverflow;
