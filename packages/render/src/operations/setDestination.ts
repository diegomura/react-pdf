import { SafeNode } from '@react-pdf/layout';

import { Context } from '../types';

const setDestination = (ctx: Context, node: SafeNode) => {
  if (!node.box) return;
  if (!node.props) return;

  if ('id' in node.props) {
    ctx.addNamedDestination(
      node.props.id!,
      'XYZ',
      node.box.left ?? 0,
      node.box.top,
      null,
    );
  }
};

export default setDestination;
