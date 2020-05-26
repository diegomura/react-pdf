import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

import renderPath from './renderPath';
import renderRect from './renderRect';
import renderLine from './renderLine';
import renderGroup from './renderGroup';
import renderCircle from './renderCircle';
import renderSvgText from './renderSvgText';
import renderEllipse from './renderEllipse';
import renderPolygon from './renderPolygon';
import renderPolyline from './renderPolyline';
import renderSvgImage from './renderSvgImage';
import isPath from '../utils/isPath';
import isText from '../utils/isText';
import isRect from '../utils/isRect';
import isLine from '../utils/isLine';
import isTspan from '../utils/isTspan';
import isImage from '../utils/isImage';
import isGroup from '../utils/isGroup';
import isCircle from '../utils/isCircle';
import isEllipse from '../utils/isEllipse';
import isPolygon from '../utils/isPolygon';
import isPolyline from '../utils/isPolyline';
import isTextInstance from '../utils/isTextInstance';
import save from '../operations/save';
import restore from '../operations/restore';
import clipNode from '../operations/clipNode';
import transform from '../operations/transform';
import getBoundingBox from '../svg/getBoundingBox';

const warnUnsupportedNode = R.tap(node => {
  console.warn(`SVG node of type ${node.type} is not currenty supported`);
});

const getProp = (d, p, v) => R.pathOr(d, ['props', p], v);

const setStrokeWidth = ctx => node => {
  const lineWidth = getProp(0, 'strokeWidth', node);
  if (lineWidth) ctx.lineWidth(lineWidth);
  return node;
};

const setStrokeColor = ctx => node => {
  const strokeColor = getProp(null, 'stroke', node);
  if (strokeColor) ctx.strokeColor(strokeColor);
  return node;
};

const setOpacity = ctx => node => {
  const opacity = getProp(null, 'opacity', node);
  if (!R.isNil(opacity)) ctx.opacity(opacity);
  return node;
};

const setFillOpacity = ctx => node => {
  const fillOpacity = getProp(null, 'fillOpacity', node);
  if (!R.isNil(fillOpacity)) ctx.fillOpacity(fillOpacity);
  return node;
};

const setStrokeOpacity = ctx => node => {
  const strokeOpacity = getProp(null, 'strokeOpacity', node);
  if (!R.isNil(strokeOpacity)) ctx.strokeOpacity(strokeOpacity);
  return node;
};

const setLineJoin = ctx => node => {
  const lineJoin = getProp(null, 'strokeLinejoin', node);
  if (lineJoin) ctx.lineJoin(lineJoin);
  return node;
};

const setLineCap = ctx => node => {
  const lineCap = getProp(null, 'strokeLinecap', node);
  if (lineCap) ctx.lineCap(lineCap);
  return node;
};

const setLineDash = ctx => node => {
  const value = getProp(null, 'strokeDasharray', node);

  if (value) ctx.dash(R.split(',', value));

  return node;
};

const hasLinearGradientFill = R.pathEq(
  ['props', 'fill', 'type'],
  P.LINEAR_GRADIENT,
);

const hasRadialGradientFill = R.pathEq(
  ['props', 'fill', 'type'],
  P.RADIAL_GRADIENT,
);

// Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L104
const setLinearGradientFill = ctx =>
  R.tap(node => {
    const bbox = getBoundingBox(node);
    const gradient = getProp(null, 'fill', node);

    const x1 = R.pathOr(0, ['props', 'x1'], gradient);
    const y1 = R.pathOr(0, ['props', 'y1'], gradient);
    const x2 = R.pathOr(1, ['props', 'x2'], gradient);
    const y2 = R.pathOr(0, ['props', 'y2'], gradient);

    const m0 = bbox[2] - bbox[0];
    const m3 = bbox[3] - bbox[1];
    const m4 = bbox[0];
    const m5 = bbox[1];

    const gx1 = m0 * x1 + m4;
    const gy1 = m3 * y1 + m5;
    const gx2 = m0 * x2 + m4;
    const gy2 = m3 * y2 + m5;

    const grad = ctx.linearGradient(gx1, gy1, gx2, gy2);

    gradient.children.forEach(stop => {
      grad.stop(
        stop.props.offset,
        stop.props.stopColor,
        stop.props.stopOpacity,
      );
    });

    ctx.fill(grad);
  });

// Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L155
const setRadialGradientFill = ctx =>
  R.tap(node => {
    const bbox = getBoundingBox(node);
    const gradient = getProp(null, 'fill', node);

    const cx = R.pathOr(0.5, ['props', 'cx'], gradient);
    const cy = R.pathOr(0.5, ['props', 'cy'], gradient);
    const fx = R.pathOr(cx, ['props', 'fx'], gradient);
    const fy = R.pathOr(cy, ['props', 'fy'], gradient);
    const r = R.pathOr(0.5, ['props', 'r'], gradient);

    const m0 = bbox[2] - bbox[0];
    const m3 = bbox[3] - bbox[1];
    const m4 = bbox[0];
    const m5 = bbox[1];

    const gr = r * m0;
    const gcx = m0 * cx + m4;
    const gcy = m3 * cy + m5;
    const gfx = m0 * fx + m4;
    const gfy = m3 * fy + m5;

    const grad = ctx.radialGradient(gfx, gfy, 0, gcx, gcy, gr);

    gradient.children.forEach(stop => {
      grad.stop(
        stop.props.offset,
        stop.props.stopColor,
        stop.props.stopOpacity,
      );
    });

    ctx.fill(grad);
  });

const setFillColor = ctx =>
  R.tap(node => {
    const fillColor = getProp(null, 'fill', node);
    if (fillColor) ctx.fillColor(fillColor);
  });

const setFill = ctx =>
  R.cond([
    [hasLinearGradientFill, setLinearGradientFill(ctx)],
    [hasRadialGradientFill, setRadialGradientFill(ctx)],
    [R.T, setFillColor(ctx)],
  ]);

const draw = ctx => node => {
  const props = R.propOr({}, 'props', node);

  if (props.fill && props.stroke) {
    ctx.fillAndStroke(props.fillRule);
  } else if (props.fill) {
    ctx.fill(props.fillRule);
  } else if (props.stroke) {
    ctx.stroke();
  } else {
    ctx.save();
    ctx.opacity(0);
    ctx.fill(null);
    ctx.restore();
  }

  return node;
};

const renderNode = ctx =>
  R.cond([
    [isTspan, R.identity],
    [isTextInstance, R.identity],
    [isPath, renderPath(ctx)],
    [isRect, renderRect(ctx)],
    [isLine, renderLine(ctx)],
    [isGroup, renderGroup(ctx)],
    [isText, renderSvgText(ctx)],
    [isCircle, renderCircle(ctx)],
    [isImage, renderSvgImage(ctx)],
    [isEllipse, renderEllipse(ctx)],
    [isPolygon, renderPolygon(ctx)],
    [isPolyline, renderPolyline(ctx)],
    [R.T, warnUnsupportedNode],
  ]);

const drawNode = ctx =>
  R.compose(
    draw(ctx),
    renderNode(ctx),
    transform(ctx),
    setOpacity(ctx),
    setFillOpacity(ctx),
    setStrokeOpacity(ctx),
    setFill(ctx),
    setStrokeColor(ctx),
    setStrokeWidth(ctx),
    setLineJoin(ctx),
    setLineDash(ctx),
    setLineCap(ctx),
  );

const clipPath = ctx => node => {
  const value = R.path(['props', 'clipPath'], node);

  if (value) {
    R.compose(
      () => ctx.clip(),
      R.forEach(renderNode(ctx)),
      R.propOr([], 'children'),
    )(value);
  }

  return node;
};

const drawChildren = ctx => node =>
  R.compose(
    R.map(
      R.compose(
        restore(ctx),
        drawChildren(ctx),
        drawNode(ctx),
        clipPath(ctx),
        save(ctx),
      ),
    ),
    R.propOr([], 'children'),
  )(node);

const defaultsZero = R.pathOr(0);

const preserveAspectRatio = ctx => node => {
  const { width, height } = node.box;
  const { viewBox, preserveAspectRatio = {} } = node.props;
  const { meetOrSlice = 'meet', align = 'xMidYMid' } = preserveAspectRatio;

  if (viewBox == null || width == null || height == null) return node;

  const x = viewBox?.minX || 0;
  const y = viewBox?.minY || 0;
  const logicalWidth = viewBox?.maxX || width;
  const logicalHeight = viewBox?.maxY || height;

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

  ctx.translate(left + paddingLeft, top + paddingTop);

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
