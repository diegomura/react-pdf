import * as R from 'ramda';

const save = (ctx, node) => {
  ctx.save();
  return node;
};

export default R.curryN(2, save);
