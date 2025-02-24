import * as P from '@react-pdf/primitives';

import { SafeDefs, SafeDefsNode, SafeNode, SafeSvgNode } from '../types';

const isDefs = (node: SafeNode): node is SafeDefsNode => node.type === P.Defs;

const getDefs = (node: SafeSvgNode) => {
  const children = node.children || [];
  const defs = children.find(isDefs);
  const values = defs?.children || [];

  return values.reduce((acc: SafeDefs, value) => {
    const id = value.props?.id;
    if (id) acc[id] = value;
    return acc;
  }, {});
};

export default getDefs;
