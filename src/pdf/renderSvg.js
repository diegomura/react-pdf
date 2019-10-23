import * as R from 'ramda';

import save from './save';
import restore from './restore';
import clipNode from './clipNode';
import renderPath from './renderPath';
import renderRect from './renderRect';
import renderLine from './renderLine';
import renderCircle from './renderCircle';
import renderEllipse from './renderEllipse';
import renderPolygon from './renderPolygon';
import renderPolyline from './renderPolyline';
import applyTransformations from './applyTransformations';
import isPath from '../node/isPath';
import isRect from '../node/isRect';
import isLine from '../node/isLine';
import isGroup from '../node/isGroup';
import isCircle from '../node/isCircle';
import renderGroup from './renderGroup';
import isEllipse from '../node/isEllipse';
import isPolygon from '../node/isPolygon';
import isPolyline from '../node/isPolyline';

const warnUnsupportedNode = R.tap(node => {
  console.warn(`SVG node of type ${node.type} is not currenty supported`);
});

const getStyle = (d, p, v) => R.pathOr(d, ['style', p], v);

const setStrokeWidth = ctx => node => {
  const lineWidth = getStyle(0, 'strokeWidth', node);
  if (lineWidth) ctx.lineWidth(lineWidth);
  return node;
};

const setStrokeColor = ctx => node => {
  const strokeColor = getStyle(null, 'stroke', node);
  if (strokeColor) ctx.strokeColor(strokeColor);
  return node;
};

const setFillColor = ctx => node => {
  const fillColor = getStyle(null, 'fill', node);
  if (fillColor) ctx.fillColor(fillColor);
  return node;
};

const setOpacity = ctx => node => {
  const opacity = getStyle(null, 'opacity', node);
  if (opacity) ctx.opacity(opacity);
  return node;
};

const setFillOpacity = ctx => node => {
  const fillOpacity = getStyle(null, 'fillOpacity', node);
  if (fillOpacity) ctx.fillOpacity(fillOpacity);
  return node;
};

const setStrokeOpacity = ctx => node => {
  const strokeOpacity = getStyle(null, 'strokeOpacity', node);
  if (strokeOpacity) ctx.strokeOpacity(strokeOpacity);
  return node;
};

const setLineJoin = ctx => node => {
  const lineJoin = getStyle(null, 'strokeLinejoin', node);
  if (lineJoin) ctx.lineJoin(lineJoin);
  return node;
};

const setLineCap = ctx => node => {
  const lineCap = getStyle(null, 'strokeLinecap', node);
  if (lineCap) ctx.lineCap(lineCap);
  return node;
};

const setLineDash = ctx => node => {
  const value = getStyle(null, 'strokeDasharray', node);

  if (value) {
    const dashArray = R.compose(
      R.map(R.o(parseFloat, R.trim)),
      R.split(','),
    )(value);

    ctx.dash(dashArray[0], { space: dashArray[1] });
  }
  return node;
};

const draw = ctx => node => {
  const style = R.propOr({}, 'style', node);

  if (style.fill && style.stroke) {
    ctx.fillAndStroke(style.fillRule);
  } else if (style.fill) {
    ctx.fill(style.fillRule);
  } else if (style.stroke) {
    ctx.stroke();
  }

  return node;
};

const drawNode = ctx =>
  R.compose(
    draw(ctx),
    R.cond([
      [isPath, renderPath(ctx)],
      [isRect, renderRect(ctx)],
      [isLine, renderLine(ctx)],
      [isGroup, renderGroup(ctx)],
      [isCircle, renderCircle(ctx)],
      [isEllipse, renderEllipse(ctx)],
      [isPolygon, renderPolygon(ctx)],
      [isPolyline, renderPolyline(ctx)],
      [R.T, warnUnsupportedNode],
    ]),
    applyTransformations(ctx),
    setOpacity(ctx),
    setFillOpacity(ctx),
    setStrokeOpacity(ctx),
    setFillColor(ctx),
    setStrokeColor(ctx),
    setStrokeWidth(ctx),
    setLineJoin(ctx),
    setLineDash(ctx),
    setLineCap(ctx),
  );

const drawChildren = ctx => node =>
  R.compose(
    R.map(
      R.compose(
        restore(ctx),
        drawChildren(ctx),
        drawNode(ctx),
        save(ctx),
      ),
    ),
    R.propOr([], 'children'),
  )(node);

const defaultsZero = R.pathOr(0);

const drawSvg = ctx => node => {
  const { top, left } = node.box;

  const paddingLeft = defaultsZero('paddingLeft', node.box);
  const paddingTop = defaultsZero('paddingTop', node.box);

  ctx.save().translate(left + paddingLeft, top + paddingTop);

  drawChildren(ctx)(node);
};

const renderSvg = (ctx, node) => {
  R.compose(
    restore(ctx),
    drawSvg(ctx),
    clipNode(ctx),
    save(ctx),
  )(node);

  return node;
};

export default R.curryN(2, renderSvg);
