/**
 * Get many nodes height
 *
 * @param {Array} nodes
 * @return {number} nodes height
 */
const getNodesHeight = nodes => {
  let max = 0;
  let min = Infinity;

  if (!nodes || nodes.length === 0) return 0;

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    min = Math.min(min, node.box.top);
    max = Math.max(max, node.box.top + node.box.height);
  }

  return max - min;
};

export default getNodesHeight;
