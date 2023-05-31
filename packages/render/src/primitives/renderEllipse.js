const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

export const drawEllipse = (ctx, cx = 0, cy = 0, rx, ry) => {
  const x = cx - rx;
  const y = cy - ry;
  const ox = rx * KAPPA;
  const oy = ry * KAPPA;
  const xe = x + rx * 2;
  const ye = y + ry * 2;
  const xm = x + rx;
  const ym = y + ry;

  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  ctx.closePath();
};

const renderEllipse = (ctx, node) => {
  const { cx, cy, rx, ry } = node.props || {};

  drawEllipse(ctx, cx, cy, rx, ry);
};

export default renderEllipse;
