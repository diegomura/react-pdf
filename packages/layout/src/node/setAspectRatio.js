import isNil from '../../../fns/isNil';

/**
 * Set aspect ratio attribute to node's Yoga instance
 *
 * @param {Number} ratio
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setAspectRatio = value => node => {
  const yogaNode = node._yogaNode;

  if (!isNil(value) && yogaNode) {
    yogaNode.setAspectRatio(value);
  }

  return node;
};

export default setAspectRatio;
