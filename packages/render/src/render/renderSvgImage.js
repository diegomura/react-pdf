import * as R from 'ramda';

import save from '../operations/save';
import restore from '../operations/restore';
// import warning from '../utils/warning';

const drawImage = ctx => node => {
  const { x, y } = node.props;
  const { width, height, opacity } = node.style;
  const paddingTop = node.box.paddingLeft || 0;
  const paddingLeft = node.box.paddingLeft || 0;

  if (node.image.data) {
    if (width !== 0 && height !== 0) {
      ctx
        .fillOpacity(opacity || 1)
        .image(node.image.data, x + paddingLeft, y + paddingTop, {
          width,
          height,
        });
    } else {
      // warning(
      //   false,
      //   `Image with src '${node.props.href}' skipped due to invalid dimensions`,
      // );
    }
  }

  return node;
};

const renderImage = (ctx, node) => {
  R.compose(
    restore(ctx),
    drawImage(ctx),
    save(ctx),
  )(node);

  return node;
};

export default R.curryN(2, renderImage);
