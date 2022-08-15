/**
 * Get image source
 *
 * @param {Object} image node
 * @returns {String | Object} image src
 */
const getSource = node =>
  node.props?.src || node.props?.source || node.props?.href;

export default getSource;
