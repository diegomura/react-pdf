import { SafePolygonNode } from '@react-pdf/layout';

import { Context } from '../types';
import parsePoints from '../svg/parsePoints';
import { drawPolyline } from './renderPolyline';

const renderPolygon = (ctx: Context, node: SafePolygonNode) => {
  const points = parsePoints(node.props.points || '');
  drawPolyline(ctx, points);
  ctx.closePath();
};

export default renderPolygon;
