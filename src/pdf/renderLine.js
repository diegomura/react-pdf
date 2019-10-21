import * as R from 'ramda';

const getProp = (p, v) => R.path(['props', p], v);

const renderLine = ctx => node => {
  const x1 = getProp('x1', node);
  const y1 = getProp('y1', node);
  const x2 = getProp('x2', node);
  const y2 = getProp('y2', node);

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  return node;
};

export default renderLine;
