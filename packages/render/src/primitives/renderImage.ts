import { isNil } from '@react-pdf/fns';
import { SafeImageNode } from '@react-pdf/layout';

import clipNode from '../operations/clipNode';
import embedImage from '../operations/embedImage';
import resolveObjectFit from '../utils/resolveObjectFit';
import { Context, RenderOptions } from '../types';

const drawImage = (
  ctx: Context,
  node: SafeImageNode,
  options: RenderOptions,
) => {
  if (!node.box) return;
  if (!node.image) return;

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

      const image = imageCache.get(cacheKey) || embedImage(ctx, node);

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
          node.props.src || node.props.source,
        )}' skipped due to invalid dimensions`,
      );
    }
  }
};

const renderImage = (
  ctx: Context,
  node: SafeImageNode,
  options: RenderOptions,
) => {
  ctx.save();

  clipNode(ctx, node);
  drawImage(ctx, node, options);

  ctx.restore();
};

export default renderImage;
