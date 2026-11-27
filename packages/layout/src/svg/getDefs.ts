import * as P from '@react-pdf/primitives';

import { SafeDefs, SafeDefsNode, SafeNode, SafeSvgNode } from '../types';

const isDefs = (node: SafeNode): node is SafeDefsNode => node.type === P.Defs;

const getDefs = (node: SafeSvgNode) => {
  const children = node.children || [];
  const defsNodes = children.filter(isDefs);
  const values = defsNodes.flatMap((defsNode) => defsNode.children || []);

  return values.reduce((acc: SafeDefs, value) => {
    const id = value.props?.id;
    // Like browsers, the first element with a given id wins
    if (id && !(id in acc)) acc[id] = value;
    return acc;
  }, {});
};

export default getDefs;
