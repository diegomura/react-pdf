const CONTENT_COLOR = '#a1c6e7';
const PADDING_COLOR = '#c4deb9';
const MARGIN_COLOR = '#f8cca1';

// TODO: Draw debug boxes using clipping to enhance quality

const debugContent = (ctx, node) => {
  const {
    left,
    top,
    width,
    height,
    paddingLeft = 0,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    borderLeftWidth = 0,
    borderTopWidth = 0,
    borderRightWidth = 0,
    borderBottomWidth = 0,
  } = node.box;

  ctx
    .fillColor(CONTENT_COLOR)
    .opacity(0.5)
    .rect(
      left + paddingLeft + borderLeftWidth,
      top + paddingTop + borderTopWidth,
      width - paddingLeft - paddingRight - borderRightWidth - borderLeftWidth,
      height - paddingTop - paddingBottom - borderTopWidth - borderBottomWidth,
    )
    .fill();
};

const debugPadding = (ctx, node) => {
  const {
    left,
    top,
    width,
    height,
    paddingLeft = 0,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    borderLeftWidth = 0,
    borderTopWidth = 0,
    borderRightWidth = 0,
    borderBottomWidth = 0,
  } = node.box;

  ctx.fillColor(PADDING_COLOR).opacity(0.5);

  // Padding top
  ctx
    .rect(
      left + paddingLeft + borderLeftWidth,
      top + borderTopWidth,
      width - paddingRight - paddingLeft - borderLeftWidth - borderRightWidth,
      paddingTop,
    )
    .fill();

  // Padding left
  ctx
    .rect(
      left + borderLeftWidth,
      top + borderTopWidth,
      paddingLeft,
      height - borderTopWidth - borderBottomWidth,
    )
    .fill();

  // Padding right
  ctx
    .rect(
      left + width - paddingRight - borderRightWidth,
      top + borderTopWidth,
      paddingRight,
      height - borderTopWidth - borderBottomWidth,
    )
    .fill();

  // Padding bottom
  ctx
    .rect(
      left + paddingLeft + borderLeftWidth,
      top + height - paddingBottom - borderBottomWidth,
      width - paddingRight - paddingLeft - borderLeftWidth - borderRightWidth,
      paddingBottom,
    )
    .fill();
};

const getMargin = box => {
  const marginLeft = box.marginLeft === 'auto' ? 0 : box.marginLeft;
  const marginTop = box.marginTop === 'auto' ? 0 : box.marginTop;
  const marginRight = box.marginRight === 'auto' ? 0 : box.marginRight;
  const marginBottom = box.marginBottom === 'auto' ? 0 : box.marginBottom;

  return {
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
  };
};

const debugMargin = (ctx, node) => {
  const { left, top, width, height } = node.box;
  const {
    marginLeft = 0,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
  } = getMargin(node.box);
  ctx.fillColor(MARGIN_COLOR).opacity(0.5);

  // Margin top
  ctx.rect(left, top - marginTop, width, marginTop).fill();

  // Margin left
  ctx
    .rect(
      left - marginLeft,
      top - marginTop,
      marginLeft,
      height + marginTop + marginBottom,
    )
    .fill();

  // Margin right
  ctx
    .rect(
      left + width,
      top - marginTop,
      marginRight,
      height + marginTop + marginBottom,
    )
    .fill();

  // Margin bottom
  ctx.rect(left, top + height, width, marginBottom).fill();
};

const debugText = (ctx, node) => {
  const { left, top, width, height } = node.box;
  const {
    marginLeft = 0,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
  } = getMargin(node.box);

  const roundedWidth = Math.round(width + marginLeft + marginRight);
  const roundedHeight = Math.round(height + marginTop + marginBottom);

  ctx
    .fontSize(6)
    .opacity(1)
    .fillColor('black')
    .text(
      `${roundedWidth} x ${roundedHeight}`,
      left - marginLeft,
      Math.max(top - marginTop - 4, 1),
    );
};

const debugOrigin = (ctx, node) => {
  if (node.origin) {
    ctx
      .circle(node.origin.left, node.origin.top, 3)
      .fill('red')
      .circle(node.origin.left, node.origin.top, 5)
      .stroke('red');
  }
};

const renderDebug = (ctx, node) => {
  if (!node.props?.debug) return;

  ctx.save();

  debugContent(ctx, node);
  debugPadding(ctx, node);
  debugMargin(ctx, node);
  debugText(ctx, node);
  debugOrigin(ctx, node);

  ctx.restore();
};

export default renderDebug;
