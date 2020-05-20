import * as R from 'ramda';

const renderPage = (ctx, node) => {
  const { width, height } = node.box;

  ctx.addPage({ size: [width, height], margin: 0 });

  return node;
};

export default R.curryN(2, renderPage);
