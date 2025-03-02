import { SafeImageNode } from '@react-pdf/layout';
import { Context } from '../types';

const embedImage = (ctx: Context, node: SafeImageNode) => {
  const src = node.image!.data;

  let image;

  if (typeof src === 'string') {
    image = ctx._imageRegistry[src];
  }

  if (!image) {
    image = ctx.openImage(src);
  }

  if (!image.obj) {
    image.embed(ctx);
  }

  return image;
};

export default embedImage;
