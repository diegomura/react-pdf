import { SafePageNode } from '@react-pdf/layout';
import { Context } from '../types';

const renderPage = (ctx: Context, node: SafePageNode) => {
  if (!node.box) return;

  const { width, height } = node.box;
  const dpi = node.props?.dpi || 72;
  const userUnit = dpi / 72;

  ctx.addPage({ size: [width, height], margin: 0, userUnit });
};

export default renderPage;
