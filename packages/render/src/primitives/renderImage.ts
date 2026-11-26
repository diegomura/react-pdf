import { SafeImageNode } from '@react-pdf/layout';

import clipNode from '../operations/clipNode';
import drawImage from '../operations/drawImage';
import { Context, RenderOptions } from '../types';

const renderImage = (
  ctx: Context,
  node: SafeImageNode,
  options: RenderOptions,
) => {
  if (!node.box) return;
  if (!node.image) return;

  const { left, top } = node.box;
  const paddingTop = node.box.paddingTop || 0;
  const paddingRight = node.box.paddingRight || 0;
  const paddingBottom = node.box.paddingBottom || 0;
  const paddingLeft = node.box.paddingLeft || 0;

  ctx.save();

  clipNode(ctx, node);

  drawImage(ctx, {
    x: left + paddingLeft,
    y: top + paddingTop,
    width: node.box.width - paddingLeft - paddingRight,
    height: node.box.height - paddingTop - paddingBottom,
    image: node.image,
    opacity: node.style?.opacity,
    objectFit: node.style?.objectFit,
    objectPositionX: node.style?.objectPositionX,
    objectPositionY: node.style?.objectPositionY,
    imageCache: options.imageCache,
  });

  ctx.restore();
};

export default renderImage;
