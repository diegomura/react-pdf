import * as R from 'ramda';

import parsePoints from '../svg/parsePoints';

export const drawPolyline = ctx => points => {
  if (points.length > 0) {
    ctx.moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
  }
};

const renderPolyline = ctx =>
  R.tap(
    R.compose(
      drawPolyline(ctx),
      parsePoints,
      R.pathOr('', ['props', 'points']),
    ),
  );

export default renderPolyline;
