import { drawEllipse } from './renderEllipse';

const renderCircle = (ctx, node) => {
  const cx = node.props?.cx;
  const cy = node.props?.cy;
  const r = node.props?.r;

  drawEllipse(ctx, r, r, cx, cy);
};

export default renderCircle;
