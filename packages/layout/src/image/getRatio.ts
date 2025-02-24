import { SafeImageNode } from '../types';

/**
 * Get image ratio
 *
 * @param node - Image node
 * @returns Image ratio
 */
const getRatio = (node: SafeImageNode) => {
  return node.image?.data ? node.image.width / node.image.height : 1;
};

export default getRatio;
