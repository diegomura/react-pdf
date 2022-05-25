import Yoga from '@react-pdf/yoga';

import isNil from '../../../fns/isNil';

const OVERFLOW = {
  hidden: Yoga.OVERFLOW_HIDDEN,
  scroll: Yoga.OVERFLOW_SCROLL,
};

/**
 * Set overflow attribute to node's Yoga instance
 *
 * @param {String} overflow value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setOverflow = value => node => {
  const yogaNode = node._yogaNode;

  if (!isNil(value) && yogaNode) {
    const overflow = OVERFLOW[value] || Yoga.OVERFLOW_VISIBLE;
    yogaNode.setOverflow(overflow);
  }

  return node;
};

export default setOverflow;
