const renderPage = (ctx, node) => {
  const { width, height } = node.box;

  ctx.addPage({ size: [width, height], margin: 0 });
};

export default renderPage;
