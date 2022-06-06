const renderPath = (ctx, node) => {
  const d = node.props?.d;

  if (d) ctx.path(node.props.d);
};

export default renderPath;
