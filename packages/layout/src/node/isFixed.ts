import { SafeNode } from '../types';

const isFixed = (node: SafeNode) => {
  if (!node.props) return false;

  return 'fixed' in node.props ? node.props.fixed === true : false;
};

export default isFixed;
