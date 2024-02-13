import * as Yoga from 'yoga-layout';
import { isNil } from '@react-pdf/fns';

const JUSTIFY_CONTENT = {
  center: Yoga.Justify.Center,
  'flex-end': Yoga.Justify.FlexEnd,
  'space-between': Yoga.Justify.SpaceBetween,
  'space-around': Yoga.Justify.SpaceAround,
  'space-evenly': Yoga.Justify.SpaceEvenly,
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
const setJustifyContent = (value) => (node) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    const justifyContent = JUSTIFY_CONTENT[value] || Yoga.Justify.FlexStart;
    yogaNode.setJustifyContent(justifyContent);
  }

  return node;
};

export default setJustifyContent;
