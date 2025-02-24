import { SafeImageNode } from '../types';

/**
 * Get image source
 *
 * @param node - Image node
 * @returns Image src
 */
const getSource = (node: SafeImageNode) => {
  if ('src' in node.props) return node.props.src;
  if ('source' in node.props) return node.props.source;
};

export default getSource;
