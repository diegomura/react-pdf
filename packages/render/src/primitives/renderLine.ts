import { SafeLineNode } from '@react-pdf/layout';
import { Context } from '../types';

const renderLine = (ctx: Context, node: SafeLineNode) => {
  const { x1, x2, y1, y2 } = node.props || {};

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
};

export default renderLine;
