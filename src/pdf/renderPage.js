import * as R from 'ramda';

const renderPage = (ctx, node) => {
  const { width, height } = node.box;

  ctx.addPage({ size: [width, height], margin: 0 });

  if (node.style.backgroundColor) {
    ctx
      .fillColor(node.style.backgroundColor)
      .rect(0, 0, width, height)
      .fill();
  }

  return node;
};

export default R.curryN(2, renderPage);
