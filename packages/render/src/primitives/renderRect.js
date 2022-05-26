const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const renderRect = (ctx, node) => {
  const x = node.props?.x || 0;
  const y = node.props?.y || 0;
  const rx = node.props?.rx || 0;
  const ry = node.props?.ry || 0;
  const width = node.props?.width || 0;
  const height = node.props?.height || 0;

  if (!width || !height) return;

  if (rx && ry) {
    const krx = rx * KAPPA;
    const kry = ry * KAPPA;

    ctx.moveTo(x + rx, y);
    ctx.lineTo(x - rx + width, y);
    ctx.bezierCurveTo(
      x - rx + width + krx,
      y,
      x + width,
      y + ry - kry,
      x + width,
      y + ry,
    );
    ctx.lineTo(x + width, y + height - ry);
    ctx.bezierCurveTo(
      x + width,
      y + height - ry + kry,
      x - rx + width + krx,
      y + height,
      x - rx + width,
      y + height,
    );
    ctx.lineTo(x + rx, y + height);
    ctx.bezierCurveTo(
      x + rx - krx,
      y + height,
      x,
      y + height - ry + kry,
      x,
      y + height - ry,
    );
    ctx.lineTo(x, y + ry);
    ctx.bezierCurveTo(x, y + ry - kry, x + rx - krx, y, x + rx, y);
  } else {
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
  }

  ctx.closePath();
};

export default renderRect;
