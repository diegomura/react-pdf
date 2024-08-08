/**
 * Get image ratio
 *
 * @param {Object} node image node
 * @returns {number} image ratio
 */
const getRatio = (node) => {
  return node.image?.data ? node.image.width / node.image.height : 1;
};

export default getRatio;
