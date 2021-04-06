import * as R from 'ramda';

const restore = (ctx, node) => {
  ctx.restore();
  return node;
};

export default R.curryN(2, restore);
