/**
 * Get image source
 *
 * @param {Object} node image node
 * @returns {string | Object} image src
 */
const getSource = (node) =>
  node.props?.src || node.props?.source || node.props?.href;

export default getSource;
