import * as R from 'ramda';

export const drawPolyline = (ctx, points) => {
  if (points.length > 0) {
    ctx.moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
  }
};

const renderPolyline = ctx => node => {
  const points = R.pathOr([], ['props', 'points'], node);

  drawPolyline(ctx, points);

  return node;
};

export default renderPolyline;
