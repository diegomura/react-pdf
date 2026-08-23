import { SafeNode } from '../types';

const isDynamic = (node: SafeNode) => {
  if (!node.props) return false;

  return 'render' in node.props;
};

export default isDynamic;
