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
import renderSvgImage from './renderSvgImage';
import applyTransformations from './applyTransformations';
import isPath from '../node/isPath';
import isRect from '../node/isRect';
import isLine from '../node/isLine';
import isImage from '../node/isImage';
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
  } else {
    ctx.save();
    ctx.opacity(0);
    ctx.fill(null);
    ctx.restore();
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
      [isImage, renderSvgImage(ctx)],
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

const preserveAspectRatio = ctx => node => {
  const { width, height, viewBox, preserveAspectRatio = {} } = node.props;
  const { meetOrSlice = 'meet', align = 'xMidYMid' } = preserveAspectRatio;

  if (viewBox == null || width == null || height == null) return node;

  const x = viewBox ? viewBox.minX : 0;
  const y = viewBox ? viewBox.minY : 0;
  const logicalWidth = viewBox ? viewBox.maxX - viewBox.minX : width;
  const logicalHeight = viewBox ? viewBox.maxY - viewBox.minY : height;

  console.log(logicalWidth);

  const logicalRatio = logicalWidth / logicalHeight;
  const physicalRatio = width / height;
  const scaleX = width / logicalWidth;
  const scaleY = height / logicalHeight;

  if (align === 'none') {
    ctx.scale(scaleX, scaleY);
    ctx.translate(-x, -y);
    return node;
  }

  if (
    (logicalRatio < physicalRatio && meetOrSlice === 'meet') ||
    (logicalRatio >= physicalRatio && meetOrSlice === 'slice')
  ) {
    ctx.scale(scaleY, scaleY);

    switch (align) {
      case 'xMinYMin':
      case 'xMinYMid':
      case 'xMinYMax':
        ctx.translate(-x, -y);
        break;

      case 'xMidYMin':
      case 'xMidYMid':
      case 'xMidYMax':
        ctx.translate(
          -x - (logicalWidth - (width * logicalHeight) / height) / 2,
          -y,
        );
        break;

      default:
        ctx.translate(
          -x - (logicalWidth - (width * logicalHeight) / height),
          -y,
        );
    }
  } else {
    ctx.scale(scaleX, scaleX);

    switch (align) {
      case 'xMinYMin':
      case 'xMidYMin':
      case 'xMaxYMin':
        ctx.translate(-x, -y);
        break;

      case 'xMinYMid':
      case 'xMidYMid':
      case 'xMaxYMid':
        ctx.translate(
          -x,
          -y - (logicalHeight - (height * logicalWidth) / width) / 2,
        );
        break;

      default:
        ctx.translate(
          -x,
          -y - (logicalHeight - (height * logicalWidth) / width),
        );
    }
  }

  return node;
};

const moveToOrigin = ctx => node => {
  const { top, left } = node.box;

  const paddingLeft = defaultsZero('paddingLeft', node.box);
  const paddingTop = defaultsZero('paddingTop', node.box);

  ctx.save().translate(left + paddingLeft, top + paddingTop);

  return node;
};

const renderSvg = (ctx, node) => {
  R.compose(
    restore(ctx),
    drawChildren(ctx),
    preserveAspectRatio(ctx),
    moveToOrigin(ctx),
    clipNode(ctx),
    save(ctx),
  )(node);

  return node;
};

export default R.curryN(2, renderSvg);
