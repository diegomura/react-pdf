import * as R from 'ramda';

const getTop = yogaNode => (yogaNode ? yogaNode.getComputedTop() : 0);
const getRight = yogaNode => (yogaNode ? yogaNode.getComputedRight() : 0);
const getBottom = yogaNode => (yogaNode ? yogaNode.getComputedBottom() : 0);
const getLeft = yogaNode => (yogaNode ? yogaNode.getComputedLeft() : 0);

/**
 * Get Yoga computed position. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} position
 */
const getPosition = node => {
  const yogaNode = node._yogaNode;

  return R.applySpec({
    top: getTop,
    right: getRight,
    bottom: getBottom,
    left: getLeft,
  })(yogaNode);
};

export default getPosition;
