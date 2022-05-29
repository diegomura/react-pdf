const renderImage = (ctx, node) => {
  if (!node.image.data) return;

  const { x, y } = node.props;
  const { width, height, opacity } = node.style;
  const paddingTop = node.box.paddingLeft || 0;
  const paddingLeft = node.box.paddingLeft || 0;

  if (width === 0 || height === 0) {
    console.warn(
      `Image with src '${node.props.href}' skipped due to invalid dimensions`,
    );
    return;
  }

  ctx.save();

  ctx
    .fillOpacity(opacity || 1)
    .image(node.image.data, x + paddingLeft, y + paddingTop, {
      width,
      height,
    });

  ctx.restore();
};

export default renderImage;
