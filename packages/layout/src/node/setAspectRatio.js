import * as R from 'ramda';

/**
 * Set aspect ratio attribute to node's Yoga instance
 *
 * @param {Number} ratio
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setAspectRatio = value =>
  R.tap(node => {
    const yogaNode = node._yogaNode;

    if (!R.isNil(value) && yogaNode) {
      yogaNode.setAspectRatio(value);
    }
  });

export default setAspectRatio;
