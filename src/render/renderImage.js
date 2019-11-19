import * as R from 'ramda';

import save from './save';
import restore from './restore';
import clipNode from './clipNode';
import warning from '../utils/warning';
import resolveObjectFit from '../image/resolveObjectFit';

const drawImage = ctx => node => {
  const { left, top } = node.box;
  const { opacity, objectPositionX, objectPositionY } = node.style;
  const paddingTop = node.box.paddingLeft || 0;
  const paddingRight = node.box.paddingRight || 0;
  const paddingBottom = node.box.paddingBottom || 0;
  const paddingLeft = node.box.paddingLeft || 0;

  const { width, height, xOffset, yOffset } = resolveObjectFit(
    node.style.objectFit,
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
      warning(
        false,
        `Image with src '${node.props.src}' skipped due to invalid dimensions`,
      );
    }
  }

  return node;
};

const renderImage = (ctx, node) => {
  R.compose(
    restore(ctx),
    drawImage(ctx),
    clipNode(ctx),
    save(ctx),
  )(node);

  return node;
};

export default R.curryN(2, renderImage);
