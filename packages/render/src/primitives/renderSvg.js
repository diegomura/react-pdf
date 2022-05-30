import * as P from '@react-pdf/primitives';
import { isNil } from '@react-pdf/fns';

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
import clipNode from '../operations/clipNode';
import transform from '../operations/transform';
import getBoundingBox from '../svg/getBoundingBox';

const setStrokeWidth = (ctx, node) => {
  const lineWidth = node.props?.strokeWidth || 0;
  if (lineWidth) ctx.lineWidth(lineWidth);
};

const setStrokeColor = (ctx, node) => {
  const strokeColor = node.props?.stroke || null;
  if (strokeColor) ctx.strokeColor(strokeColor);
};

const setOpacity = (ctx, node) => {
  const opacity = node.props?.opacity || null;
  if (!isNil(opacity)) ctx.opacity(opacity);
};

const setFillOpacity = (ctx, node) => {
  const fillOpacity = node.props?.fillOpacity || null;
  if (!isNil(fillOpacity)) ctx.fillOpacity(fillOpacity);
};

const setStrokeOpacity = (ctx, node) => {
  const strokeOpacity = node.props?.strokeOpacity || null;
  if (!isNil(strokeOpacity)) ctx.strokeOpacity(strokeOpacity);
};

const setLineJoin = (ctx, node) => {
  const lineJoin = node.props?.strokeLinejoin || null;
  if (lineJoin) ctx.lineJoin(lineJoin);
};

const setLineCap = (ctx, node) => {
  const lineCap = node.props?.strokeLinecap || null;
  if (lineCap) ctx.lineCap(lineCap);
};

const setLineDash = (ctx, node) => {
  const value = node.props?.strokeDasharray || null;

  if (value) ctx.dash(value.split(','));
};

const hasLinearGradientFill = node =>
  node.props?.fill?.type === P.LinearGradient;

const hasRadialGradientFill = node =>
  node.props?.fill?.type === P.RadialGradient;

// Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L104
const setLinearGradientFill = (ctx, node) => {
  const bbox = getBoundingBox(node);
  const gradient = node.props?.fill || null;

  const x1 = gradient.props.x1 || 0;
  const y1 = gradient.props.y1 || 0;
  const x2 = gradient.props.x2 || 1;
  const y2 = gradient.props.y2 || 0;

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
    grad.stop(stop.props.offset, stop.props.stopColor, stop.props.stopOpacity);
  });

  ctx.fill(grad);
};

// Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L155
const setRadialGradientFill = (ctx, node) => {
  const bbox = getBoundingBox(node);
  const gradient = node.props?.fill || null;

  const cx = gradient.props.cx || 0.5;
  const cy = gradient.props.cy || 0.5;
  const fx = gradient.props.fx || cx;
  const fy = gradient.props.fy || cy;
  const r = gradient.props.r || 0.5;

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
    grad.stop(stop.props.offset, stop.props.stopColor, stop.props.stopOpacity);
  });

  ctx.fill(grad);
};

const setFillColor = (ctx, node) => {
  const fillColor = node.props?.fill || null;

  if (fillColor) ctx.fillColor(fillColor);
};

const setFill = (ctx, node) => {
  if (hasLinearGradientFill(node)) return setLinearGradientFill(ctx, node);
  if (hasRadialGradientFill(node)) return setRadialGradientFill(ctx, node);

  return setFillColor(ctx, node);
};

const draw = (ctx, node) => {
  const props = node.props || {};

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
};

const noop = () => {};

const renderFns = {
  [P.Tspan]: noop,
  [P.TextInstance]: noop,
  [P.Path]: renderPath,
  [P.Rect]: renderRect,
  [P.Line]: renderLine,
  [P.G]: renderGroup,
  [P.Text]: renderSvgText,
  [P.Circle]: renderCircle,
  [P.Image]: renderSvgImage,
  [P.Ellipse]: renderEllipse,
  [P.Polygon]: renderPolygon,
  [P.Polyline]: renderPolyline,
};

const renderNode = (ctx, node) => {
  const renderFn = renderFns[node.type];

  if (renderFns) {
    renderFn(ctx, node);
  } else {
    console.warn(`SVG node of type ${node.type} is not currenty supported`);
  }
};

const drawNode = (ctx, node) => {
  setLineCap(ctx, node);
  setLineDash(ctx, node);
  setLineJoin(ctx, node);
  setStrokeWidth(ctx, node);
  setStrokeColor(ctx, node);
  setFill(ctx, node);
  setStrokeOpacity(ctx, node);
  setFillOpacity(ctx, node);
  setOpacity(ctx, node);
  transform(ctx, node);
  renderNode(ctx, node);
  draw(ctx, node);
};

const clipPath = (ctx, node) => {
  const value = node.props?.clipPath;

  if (value) {
    const children = value.children || [];
    children.forEach(child => renderNode(ctx, child));
    ctx.clip();
  }
};

const drawChildren = (ctx, node) => {
  const children = node.children || [];

  children.forEach(child => {
    ctx.save();

    clipPath(ctx, child);
    drawNode(ctx, child);
    drawChildren(ctx, child);

    ctx.restore();
  });
};

const resolveAspectRatio = (ctx, node) => {
  const { width, height } = node.box;
  const { viewBox, preserveAspectRatio = {} } = node.props;
  const { meetOrSlice = 'meet', align = 'xMidYMid' } = preserveAspectRatio;

  if (viewBox == null || width == null || height == null) return;

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
    return;
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
};

const moveToOrigin = (ctx, node) => {
  const { top, left } = node.box;

  const paddingLeft = node.box.paddingLeft || 0;
  const paddingTop = node.box.paddingTop || 0;

  ctx.translate(left + paddingLeft, top + paddingTop);
};

const renderSvg = (ctx, node) => {
  ctx.save();

  clipNode(ctx, node);
  moveToOrigin(ctx, node);
  resolveAspectRatio(ctx, node);
  drawChildren(ctx, node);

  ctx.restore();
};

export default renderSvg;
