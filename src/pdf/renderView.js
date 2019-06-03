import * as R from 'ramda';

const renderView = (ctx, node) => {
  const { top, left, width, height } = node.box;

  if (node.style.backgroundColor) {
    ctx
      .fillColor(node.style.backgroundColor)
      .rect(left, top, width, height)
      .fill();
  }

  return node;
};

export default R.curryN(2, renderView);
