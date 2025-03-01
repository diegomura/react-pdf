import { SafePathNode } from '@react-pdf/layout';
import { Context } from '../types';

const renderPath = (ctx: Context, node: SafePathNode) => {
  const d = node.props?.d;

  if (d) ctx.path(node.props.d);
};

export default renderPath;
