import * as P from '@react-pdf/primitives';
import { SafeNode } from '../types';

const NON_WRAP_TYPES = [P.Svg, P.Note, P.Image, P.Canvas];

const getWrap = (node: SafeNode) => {
  if (NON_WRAP_TYPES.includes(node.type)) return false;

  if (!node.props) return true;

  return 'wrap' in node.props ? node.props.wrap : true;
};

export default getWrap;
