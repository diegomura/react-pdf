import * as R from 'ramda';

const setDestination = ctx =>
  R.tap(node => {
    if (node.props.id) {
      ctx.addNamedDestination(node.props.id, 'XYZ', null, node.box.top, null);
    }
  });

export default setDestination;
