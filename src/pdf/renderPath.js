import * as R from 'ramda';

const renderPath = ctx => node => {
  console.log(node);
  const d = R.path(['props', 'd'], node);

  if (d) {
    ctx.path(node.props.d);
  }

  return node;
};

export default renderPath;
