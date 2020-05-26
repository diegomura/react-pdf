import * as R from 'ramda';

const renderNote = (ctx, node) => {
  const { top, left } = node.box;
  const value = node?.children?.[0].value || '';

  ctx.note(left, top, 0, 0, value);

  return node;
};

export default R.curryN(2, renderNote);
