import * as R from 'ramda';

import save from './save';
import restore from './restore';
import clipNode from './clipNode';

const drawBackground = ctx => node => {
  if (node.box && node.style.backgroundColor) {
    const { top, left, width, height } = node.box;

    ctx
      .fillColor(node.style.backgroundColor)
      .rect(left, top, width, height)
      .fill();
  }

  return node;
};

const shouldRenderBackground = R.hasPath(['style', 'backgroundColor']);

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
