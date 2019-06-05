import * as R from 'ramda';

import save from './save';
import restore from './restore';
import clipNode from './clipNode';
import warning from '../utils/warning';

const drawImage = ctx => node => {
  const { opacity } = node.style;
  const { width, height, left, top, paddingLeft, paddingTop } = node.box;

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
