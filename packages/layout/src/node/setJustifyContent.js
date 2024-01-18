import { isNil } from '@react-pdf/fns';
import Yoga from '../../yoga';

const JUSTIFY_CONTENT = {
  center: Yoga.JUSTIFY_CENTER,
  'flex-end': Yoga.JUSTIFY_FLEX_END,
  'space-between': Yoga.JUSTIFY_SPACE_BETWEEN,
  'space-around': Yoga.JUSTIFY_SPACE_AROUND,
  'space-evenly': Yoga.JUSTIFY_SPACE_EVENLY,
};

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * Set justify content attribute to node's Yoga instance
 *
 * @param {string} value justify content value
 * @returns {NodeInstanceWrapper} node instance wrapper
 */
const setJustifyContent = value => node => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    const justifyContent = JUSTIFY_CONTENT[value] || Yoga.JUSTIFY_FLEX_START;
    yogaNode.setJustifyContent(justifyContent);
  }

  return node;
};

export default setJustifyContent;
