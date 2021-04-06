import * as R from 'ramda';

const renderPath = ctx =>
  R.tap(node => {
    const d = R.path(['props', 'd'], node);
    if (d) ctx.path(node.props.d);
  });

export default renderPath;
