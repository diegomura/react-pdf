import * as R from 'ramda';

import warning from '../utils/warning';

const renderImage = (ctx, node) => {
  const { opacity } = node.style;
  const { width, height, left, top, paddingLeft, paddingTop } = node.box;

  ctx.save();

  // Clip path to keep image inside border radius
  // this.clip();

  if (node.image.data) {
    if (width !== 0 && height !== 0) {
      ctx
        .fillOpacity(opacity)
        .image(node.image.data, left + paddingLeft, top + paddingTop, {
          width,
          height,
        });
    } else {
      warning(
        false,
        `Image with src '${node.props.src}' skipped due to invalid dimensions`,
      );
    }
  }

  ctx.restore();

  return node;
};

export default R.curryN(2, renderImage);
