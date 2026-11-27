import isDynamic from './isDynamic';
import { SafeNode } from '../types';

const hasDynamic = (node: SafeNode): boolean =>
  isDynamic(node) || (node.children || []).some((child) => hasDynamic(child));

export default hasDynamic;
