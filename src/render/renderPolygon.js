import * as R from 'ramda';

import { drawPolyline } from './renderPolyline';

const renderPolygon = ctx => node => {
  const points = R.pathOr([], ['props', 'points'], node);

  drawPolyline(ctx, points);

  ctx.closePath();

  return node;
};

export default renderPolygon;
