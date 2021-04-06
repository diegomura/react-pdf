/**
 * Get image ratio
 *
 * @param {Object} image node
 * @returns {Number} image ratio
 */
const getRatio = node => {
  return node.image?.data ? node.image.width / node.image.height : 1;
};

export default getRatio;
