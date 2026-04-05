import { isNil } from '@react-pdf/fns';
import { SafeNode } from '@react-pdf/layout';
import { Image } from '@react-pdf/image';

import clipNode from '../operations/clipNode';
import embedImage from '../operations/embedImage';
import { Context, RenderOptions } from '../types';

const getBackgroundImage = (node: SafeNode): Image | null => {
  const value = (node.style as Record<string, any>)?.backgroundImage;

  if (value && typeof value === 'object' && value.data) return value;

  return null;
};

const drawBackgroundImage = (
  ctx: Context,
  node: SafeNode,
  image: Image,
  options: RenderOptions,
) => {
  if (!node.box) return;

  const { left, top, width, height } = node.box;
  const opacity = isNil(node.style?.opacity) ? 1 : node.style.opacity;
  const imageCache = options.imageCache || new Map();

  const cacheKey = image.key;
  const imageNode = { image } as any;
  const embedded = imageCache.get(cacheKey) || embedImage(ctx, imageNode);

  if (cacheKey) imageCache.set(cacheKey, embedded);

  ctx.fillOpacity(opacity).image(embedded, left, top, { width, height });
};

const renderBackgroundImage = (
  ctx: Context,
  node: SafeNode,
  options: RenderOptions,
) => {
  const image = node.box ? getBackgroundImage(node) : null;

  if (image) {
    ctx.save();
    clipNode(ctx, node);
    drawBackgroundImage(ctx, node, image, options);
    ctx.restore();
  }
};

export default renderBackgroundImage;
