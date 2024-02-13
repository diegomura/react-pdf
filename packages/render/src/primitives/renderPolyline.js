import parsePoints from '../svg/parsePoints';

export const drawPolyline = (ctx, points) => {
  if (points.length > 0) {
    ctx.moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach((p) => ctx.lineTo(p[0], p[1]));
  }
};

const renderPolyline = (ctx, node) => {
  const points = parsePoints(node.props.points || '');
  drawPolyline(ctx, points);
};

export default renderPolyline;
