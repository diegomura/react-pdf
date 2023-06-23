import Yoga from '@nutshelllabs/yoga';

const FLEX_WRAP = {
  wrap: Yoga.WRAP_WRAP,
  'wrap-reverse': Yoga.WRAP_WRAP_REVERSE,
};

/**
 * Set flex wrap attribute to node's Yoga instance
 *
 * @param {String} flex wrap value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexWrap = value => node => {
  const { yogaNode } = node;

  if (yogaNode) {
    const flexWrap = FLEX_WRAP[value] || Yoga.WRAP_NO_WRAP;
    yogaNode.setFlexWrap(flexWrap);
  }

  return node;
};

export default setFlexWrap;
