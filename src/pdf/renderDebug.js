import * as R from 'ramda';

const CONTENT_COLOR = '#a1c6e7';
const PADDING_COLOR = '#c4deb9';
const MARGIN_COLOR = '#f8cca1';

const shouldDebug = R.pathEq(['props', 'debug'], true);

// TODO: Draw debug boxes using clipping to enhance quality

const debugContent = (ctx, node) => {
  const {
    left,
    top,
    width,
    height,
    paddingLeft,
    paddingTop,
    paddingRight,
    paddingBottom,
  } = node.box;

  ctx
    .fillColor(CONTENT_COLOR)
    .opacity(0.5)
    .rect(
      left + paddingLeft,
      top + paddingTop,
      width - paddingLeft - paddingRight,
      height - paddingTop - paddingBottom,
    )
    .fill();
};

const debugPadding = (ctx, node) => {
  const {
    left,
    top,
    width,
    height,
    paddingLeft,
    paddingTop,
    paddingRight,
    paddingBottom,
  } = node.box;

  ctx.fillColor(PADDING_COLOR).opacity(0.5);

  // Padding top
  ctx
    .rect(
      left + paddingLeft,
      top,
      width - paddingRight - paddingLeft,
      paddingTop,
    )
    .fill();

  // Padding left
  ctx.rect(left, top, paddingLeft, height).fill();

  // Padding right
  ctx.rect(left + width - paddingRight, top, paddingRight, height).fill();

  // Padding bottom
  ctx
    .rect(
      left + paddingLeft,
      top + height - paddingBottom,
      width - paddingRight - paddingLeft,
      paddingBottom,
    )
    .fill();
};

const debugMargin = (ctx, node) => {
  const {
    left,
    top,
    width,
    height,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
  } = node.box;
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
  const {
    left,
    top,
    width,
    height,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
  } = node.box;

  const roundedWidth = Math.round(width + marginLeft + marginRight);
  const roundedHeight = Math.round(height + marginTop + marginBottom);

  ctx
    .fontSize(4)
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
      .circle(node.origin[0], node.origin[1], 3)
      .fill('red')
      .circle(node.origin[0], node.origin[1], 5)
      .stroke('red');
  }
};

const renderDebug = (ctx, node) => {
  if (!shouldDebug(node)) return node;

  ctx.save();

  debugContent(ctx, node);
  debugPadding(ctx, node);
  debugMargin(ctx, node);
  debugText(ctx, node);
  debugOrigin(ctx, node);

  ctx.restore();
};

export default R.curryN(2, renderDebug);
