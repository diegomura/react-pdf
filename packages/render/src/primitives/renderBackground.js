import * as R from 'ramda';

import save from '../operations/save';
import restore from '../operations/restore';
import clipNode from '../operations/clipNode';

const drawBackground = ctx => node => {
  if (node.box && node.style.backgroundColor) {
    const { top, left, width, height } = node.box;
    const opacity = R.defaultTo(1, node.style?.opacity);

    ctx
      .fillOpacity(opacity)
      .fillColor(node.style.backgroundColor)
      .rect(left, top, width, height)
      .fill();
  }

  return node;
};

const shouldRenderBackground = R.both(
  R.has('box'),
  R.hasPath(['style', 'backgroundColor']),
);

const renderBackground = (ctx, node) => {
  R.when(
    shouldRenderBackground,
    R.compose(
      restore(ctx),
      drawBackground(ctx),
      clipNode(ctx),
      save(ctx),
    ),
  )(node);

  return node;
};

export default R.curryN(2, renderBackground);
