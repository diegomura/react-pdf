import * as R from 'ramda';

import save from '../operations/save';
import restore from '../operations/restore';

const CONTENT_COLOR = '#a1c6e7';
const PADDING_COLOR = '#c4deb9';
const MARGIN_COLOR = '#f8cca1';

const shouldDebug = R.pathEq(['props', 'debug'], true);

// TODO: Draw debug boxes using clipping to enhance quality

const debugContent = ctx =>
  R.tap(node => {
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
        height -
          paddingTop -
          paddingBottom -
          borderTopWidth -
          borderBottomWidth,
      )
      .fill();
  });

const debugPadding = ctx =>
  R.tap(node => {
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
  });

const debugMargin = ctx =>
  R.tap(node => {
    const {
      left,
      top,
      width,
      height,
      marginLeft = 0,
      marginTop = 0,
      marginRight = 0,
      marginBottom = 0,
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
  });

const debugText = ctx =>
  R.tap(node => {
    const {
      left,
      top,
      width,
      height,
      marginLeft = 0,
      marginTop = 0,
      marginRight = 0,
      marginBottom = 0,
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
  });

const debugOrigin = ctx =>
  R.tap(node => {
    if (node.origin) {
      ctx
        .circle(node.origin.left, node.origin.top, 3)
        .fill('red')
        .circle(node.origin.left, node.origin.top, 5)
        .stroke('red');
    }
  });

const renderDebug = ctx =>
  R.tap(
    R.when(
      shouldDebug,
      R.compose(
        restore(ctx),
        debugOrigin(ctx),
        debugText(ctx),
        debugMargin(ctx),
        debugPadding(ctx),
        debugContent(ctx),
        save(ctx),
      ),
    ),
  );

export default renderDebug;
