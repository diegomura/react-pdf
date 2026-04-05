import { isNil } from '@react-pdf/fns';
import { Image } from '@react-pdf/image';

import resolveObjectFit from '../utils/resolveObjectFit';
import { Context } from '../types';

type DrawImageOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
  image: Image;
  opacity?: number;
  objectFit?: string;
  objectPositionX?: number | string;
  objectPositionY?: number | string;
  imageCache?: Map<string | undefined, any>;
};

const drawImage = (ctx: Context, options: DrawImageOptions) => {
  const {
    x,
    y,
    width: containerWidth,
    height: containerHeight,
    image,
    opacity,
    objectFit,
    objectPositionX,
    objectPositionY,
    imageCache = new Map(),
  } = options;

  const { width, height, xOffset, yOffset } = resolveObjectFit(
    objectFit,
    containerWidth,
    containerHeight,
    image.width,
    image.height,
    objectPositionX,
    objectPositionY,
  );

  if (!image.data) return;

  if (width === 0 || height === 0) return;

  const cacheKey = image.key;

  let embeddedImage = imageCache.get(cacheKey);

  if (!embeddedImage) {
    const src = image.data;

    embeddedImage =
      (typeof src === 'string' && ctx._imageRegistry[src]) ||
      ctx.openImage(src);

    if (!embeddedImage.obj) {
      embeddedImage.embed(ctx);
    }
  }

  if (cacheKey) imageCache.set(cacheKey, embeddedImage);

  const imageOpacity = isNil(opacity) ? 1 : opacity;

  ctx
    .fillOpacity(imageOpacity)
    .image(embeddedImage, x + xOffset, y + yOffset, { width, height });
};

export default drawImage;
