import { SafeImageNode } from '@react-pdf/layout';

import { Context } from '../types';
import WebPImage from '../operations/WebPImage';

const renderImage = (ctx: Context, node: SafeImageNode) => {
  if (!node.box) return;
  if (!node.image?.data) return;

  const { x = 0, y = 0 } = node.props;
  const { width, height, opacity } = node.style;
  const paddingTop = node.box.paddingLeft || 0;
  const paddingLeft = node.box.paddingLeft || 0;

  if (width === 0 || height === 0) {
    console.warn(
      `Image with src '${
        (node.props as any).href
      }' skipped due to invalid dimensions`,
    );
    return;
  }

  if (typeof width === 'string' || typeof height === 'string') {
    console.warn(
      `Image with src '${
        (node.props as any).href
      }' skipped due to percentage width or height`,
    );
    return;
  }

  const src =
    node.image.format === 'webp'
      ? new WebPImage(node.image, `I${++ctx._imageCount}`)
      : node.image.data;

  ctx.save();

  ctx
    .fillOpacity(opacity || 1)
    .image(src as any, x + paddingLeft, y + paddingTop, {
      width,
      height,
    });

  ctx.restore();
};

export default renderImage;
