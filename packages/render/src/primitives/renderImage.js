import { isNil } from '@nutshelllabs/fns';

import clipNode from '../operations/clipNode';
import resolveObjectFit from '../utils/resolveObjectFit';

const drawImage = (ctx, node, options = {}) => {
  const { left, top } = node.box;
  const opacity = node.style?.opacity;
  const objectFit = node.style?.objectFit;
  const objectPositionX = node.style?.objectPositionX;
  const objectPositionY = node.style?.objectPositionY;
  const paddingTop = node.box.paddingTop || 0;
  const paddingRight = node.box.paddingRight || 0;
  const paddingBottom = node.box.paddingBottom || 0;
  const paddingLeft = node.box.paddingLeft || 0;
  const imageCache = options.imageCache || new Map();

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
      const cacheKey = node.image.key;

      const image = imageCache.get(cacheKey) || ctx.embedImage(node.image.data);

      if (cacheKey) imageCache.set(cacheKey, image);

      const imageOpacity = isNil(opacity) ? 1 : opacity;

      ctx
        .fillOpacity(imageOpacity)
        .image(
          image,
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

const renderImage = (ctx, node, options) => {
  ctx.save();

  clipNode(ctx, node);
  drawImage(ctx, node, options);

  ctx.restore();
};

export default renderImage;
