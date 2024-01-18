import Yoga from '../../yoga';

/**
 * Set display attribute to node's Yoga instance
 *
 * @param {String} display
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setDisplay = value => node => {
  const { yogaNode } = node;

  if (yogaNode) {
    yogaNode.setDisplay(
      value === 'none' ? Yoga.DISPLAY_NONE : Yoga.DISPLAY_FLEX,
    );
  }

  return node;
};

export default setDisplay;
