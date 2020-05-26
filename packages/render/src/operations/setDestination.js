import * as R from 'ramda';

const setDestination = (ctx, node) => {
  if (node.props?.id) {
    ctx.addNamedDestination(node.props.id, 'XYZ', null, node.box.top, null);
  }

  return node;
}

export default R.curryN(2, setDestination);
