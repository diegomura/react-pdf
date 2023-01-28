import renderPolyline from './renderPolyline';

const renderPolygon = (ctx, node) => {
  renderPolyline(ctx, node);
  ctx.closePath();
};

export default renderPolygon;
