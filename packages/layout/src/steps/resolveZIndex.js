import * as P from '@nutshelllabs/primitives';

const getZIndex = node => node.style.zIndex;

const shouldSort = node => node.type !== P.Document && node.type !== P.Svg;

const sortZIndex = (a, b) => {
  const za = getZIndex(a);
  const zb = getZIndex(b);

  if (!za && !zb) return 0;
  if (!za) return 1;
  if (!zb) return -1;

  return zb - za;
};

/**
 * Sort children by zIndex value
 *
 * @param {Object} node
 * @returns {Object} node
 */
const resolveZIndex = node => {
  if (!node.children) return node;

  const sortedChildren = shouldSort(node)
    ? node.children.sort(sortZIndex)
    : node.children;

  node.children = sortedChildren.map(resolveZIndex);
  return node;
};

export default resolveZIndex;
