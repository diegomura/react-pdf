import { SafeImageNode } from '../types';

/**
 * Get image source
 *
 * @param node - Image node
 * @returns Image src
 */
const getSource = (node: SafeImageNode) => {
  if (node.props.src) return node.props.src;
  if (node.props.source) return node.props.source;
};

export default getSource;
