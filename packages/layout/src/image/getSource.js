/**
 * Get image source
 *
 * @param {Object} image node
 * @returns {String} image src
 */
const getSource = node => {
  const value = node.props?.src || node.props?.source || node.props?.href;
  return typeof value === 'string' ? { uri: value } : value;
};

export default getSource;
