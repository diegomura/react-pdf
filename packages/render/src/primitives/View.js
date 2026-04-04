import { drawBorders, drawBackgroundColor } from '../operations';

const renderView = (ctx, node) => {
  const {
    left,
    top,
    width,
    height,
    borderTopWidth = 0,
    borderRightWidth = 0,
    borderBottomWidth = 0,
    borderLeftWidth = 0,
  } = node.box;

  drawBackgroundColor(ctx, node);

  // We need to clip border so they don't overflow the container
  ctx.save();
  ctx.rect(
    left + borderLeftWidth / 2,
    top + borderTopWidth / 2,
    width - (borderLeftWidth + borderRightWidth) / 2,
    height - (borderTopWidth + borderBottomWidth) / 2,
  ).clip();

  drawBorders(ctx, node);

  ctx.restore();
};

export default renderView;
