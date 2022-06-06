const setDestination = (ctx, node) => {
  if (node.props?.id) {
    ctx.addNamedDestination(node.props.id, 'XYZ', null, node.box.top, null);
  }
};

export default setDestination;
