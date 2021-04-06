import * as R from 'ramda';

import renderPolyline from './renderPolyline';

const closePath = ctx => R.tap(() => ctx.closePath());

const renderPolygon = ctx =>
  R.compose(
    closePath(ctx),
    renderPolyline(ctx),
  );

export default renderPolygon;
