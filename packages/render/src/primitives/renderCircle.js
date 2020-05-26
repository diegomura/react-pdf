import * as R from 'ramda';

import { drawEllipse } from './renderEllipse';

const getProp = (p, v) => R.path(['props', p], v);

const renderCircle = (ctx, node) => {
  const cx = getProp('cx', node);
  const cy = getProp('cy', node);
  const r = getProp('r', node);

  drawEllipse(ctx, cx, cy, r, r);

  return node;
};

export default R.curryN(2, renderCircle);
