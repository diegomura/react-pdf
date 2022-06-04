import clipNode from '../operations/clipNode';
import resolveObjectFit from '../utils/resolveObjectFit';

const drawImage = (ctx, node) => {
  const { left, top } = node.box;
  const opacity = node.style?.opacity;
  const objectFit = node.style?.objectFit;
  const objectPositionX = node.style?.objectPositionX;
  const objectPositionY = node.style?.objectPositionY;
  const paddingTop = node.box.paddingTop || 0;
  const paddingRight = node.box.paddingRight || 0;
  const paddingBottom = node.box.paddingBottom || 0;
  const paddingLeft = node.box.paddingLeft || 0;

  const { width, height, xOffset, yOffset } = resolveObjectFit(
    objectFit,
    node.box.width - paddingLeft - paddingRight,
    node.box.height - paddingTop - paddingBottom,
    node.image.width,
    node.image.height,
    objectPositionX,
    objectPositionY,
  );

  if (node.image.data) {
    if (width !== 0 && height !== 0) {
      ctx
        .fillOpacity(opacity || 1)
        .image(
          node.image.data,
          left + paddingLeft + xOffset,
          top + paddingTop + yOffset,
          {
            width,
            height,
          },
        );
    } else {
      console.warn(
        `Image with src '${JSON.stringify(
          node.props.src,
        )}' skipped due to invalid dimensions`,
      );
    }
  }
};

const renderImage = (ctx, node) => {
  ctx.save();

  clipNode(ctx, node);
  drawImage(ctx, node);

  ctx.restore();
};

export default renderImage;
