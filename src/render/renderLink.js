import * as R from 'ramda';

import getSource from '../link/getSource';

const renderLink = (ctx, node) => {
  const { top, left, width, height } = node.box;
  const src = getSource(node);

  ctx.link(left, top, width, height, src);

  return node;
};

export default R.curryN(2, renderLink);
