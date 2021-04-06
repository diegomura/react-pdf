import * as R from 'ramda';

const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const getProp = (d, p, v) => R.pathOr(d, ['props', p], v);

const renderRect = ctx => node => {
  const x = getProp(0, 'x', node);
  const y = getProp(0, 'y', node);
  const rx = getProp(0, 'rx', node);
  const ry = getProp(0, 'ry', node);
  const width = getProp(0, 'width', node);
  const height = getProp(0, 'height', node);

  if (!width || !height) return node;

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

  return node;
};

export default renderRect;
