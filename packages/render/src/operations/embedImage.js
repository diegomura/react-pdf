const embedImage = (ctx, node) => {
  const src = node.image.data;

  let image;

  if (typeof src === 'string') {
    image = ctx._imageRegistry[src];
  }

  if (!image) {
    if (src.width && src.height) {
      image = src;
    } else {
      image = ctx.openImage(src);
    }
  }

  if (!image.obj) {
    image.embed(ctx);
  }

  return image;
};

export default embedImage;
