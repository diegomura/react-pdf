import * as P from '@react-pdf/primitives';
import { isNil } from '@react-pdf/fns';
import { Transform } from '@react-pdf/stylesheet';
import {
  SafeLinearGradientNode,
  SafeNode,
  SafeRadialGradientNode,
  SafeSvgNode,
} from '@react-pdf/layout';

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
import { Context } from '../types';

type Primitives = (typeof P)[keyof typeof P];

const setStrokeWidth = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('strokeWidth' in node.props)) return;

  const lineWidth = node.props.strokeWidth;
  if (lineWidth) ctx.lineWidth(lineWidth);
};

const setStrokeColor = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('stroke' in node.props)) return;

  const strokeColor = node.props.stroke;
  if (strokeColor) ctx.strokeColor(strokeColor);
};

const setOpacity = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('opacity' in node.props)) return;

  const opacity = node.props.opacity;
  if (!isNil(opacity)) ctx.opacity(opacity);
};

const setFillOpacity = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('fillOpacity' in node.props)) return;

  const fillOpacity = node.props.fillOpacity || null;
  if (!isNil(fillOpacity)) ctx.fillOpacity(fillOpacity);
};

const setStrokeOpacity = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('strokeOpacity' in node.props)) return;

  const strokeOpacity = node.props?.strokeOpacity;
  if (!isNil(strokeOpacity)) ctx.strokeOpacity(strokeOpacity);
};

const setLineJoin = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('strokeLinejoin' in node.props)) return;

  const lineJoin = node.props.strokeLinejoin;
  if (lineJoin) ctx.lineJoin(lineJoin);
};

const setLineCap = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('strokeLinecap' in node.props)) return;

  const lineCap = node.props?.strokeLinecap;
  if (lineCap) ctx.lineCap(lineCap);
};

const setLineDash = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('strokeDasharray' in node.props)) return;

  const value = node.props?.strokeDasharray || null;

  // @ts-expect-error check this works as expected
  if (value) ctx.dash(value.split(/[\s,]+/).map(Number));
};

const hasLinearGradientFill = (node: SafeNode) => {
  if (!node.props) return false;
  if (!('fill' in node.props)) return false;
  if (typeof node.props.fill === 'string') return false;

  return node.props.fill?.type === P.LinearGradient;
};

const hasRadialGradientFill = (node: SafeNode) => {
  if (!node.props) return false;
  if (!('fill' in node.props)) return false;
  if (typeof node.props.fill === 'string') return false;

  return node.props.fill?.type === P.RadialGradient;
};

function multiplyMatrices(m1: number[], m2: number[]) {
  const a = m1[0] * m2[0] + m1[2] * m2[1];
  const b = m1[1] * m2[0] + m1[3] * m2[1];
  const c = m1[0] * m2[2] + m1[2] * m2[3];
  const d = m1[1] * m2[2] + m1[3] * m2[3];
  const e = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
  const f = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
  return [a, b, c, d, e, f];
}

const transformGradient = (
  grad: any,
  transforms: Transform[],
  bbox: number[],
  units: string,
) => {
  const matrices = transforms.map((transform) => {
    switch (transform.operation) {
      case 'scale': {
        const value = transform.value;
        return [value[0], 0, 0, value[1], 0, 0];
      }
      case 'translate': {
        const value = transform.value;
        let x = value[0] || 0;
        let y = value[1] || 0;

        if (units === 'objectBoundingBox') {
          x = (bbox[2] - bbox[0]) * x;
          y = (bbox[3] - bbox[1]) * y;
        }

        return [1, 0, 0, 1, x, y];
      }
      case 'rotate': {
        const value = transform.value;
        const cos = Math.cos(value[0]);
        const sin = Math.sin(value[0]);
        return [cos, sin, -sin, cos, 0, 0];
      }
      case 'skew': {
        const value = transform.value;
        return [1, Math.tan(value[0]), Math.tan(value[1]), 1, 0, 0];
      }
      case 'matrix': {
        const value = transform.value;
        let x = value[4] || 0;
        let y = value[5] || 0;

        if (units === 'objectBoundingBox') {
          x = (bbox[2] - bbox[0]) * x;
          y = (bbox[3] - bbox[1]) * y;
        }

        return [value[0], value[1], value[2], value[3], x, y];
      }
      default:
        return [1, 0, 0, 1, 0, 0];
    }
  });

  const matrix = matrices.reduce(multiplyMatrices, [1, 0, 0, 1, 0, 0]);

  grad.setTransform(...matrix);
};

// Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L104
const setLinearGradientFill = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('fill' in node.props)) return;

  const bbox = getBoundingBox(node);
  const gradient = node.props?.fill as SafeLinearGradientNode;

  if (!gradient) return;

  const units = gradient.props.gradientUnits || 'objectBoundingBox';
  const transforms = gradient.props.gradientTransform || [];

  let x1 = gradient.props.x1 || 0;
  let y1 = gradient.props.y1 || 0;
  let x2 = gradient.props.x2 || 1;
  let y2 = gradient.props.y2 || 0;

  if (units === 'objectBoundingBox') {
    const m0 = bbox[2] - bbox[0];
    const m3 = bbox[3] - bbox[1];
    const m4 = bbox[0];
    const m5 = bbox[1];

    x1 = m0 * x1 + m4;
    y1 = m3 * y1 + m5;
    x2 = m0 * x2 + m4;
    y2 = m3 * y2 + m5;
  }

  const grad = ctx.linearGradient(x1, y1, x2, y2);

  transformGradient(grad, transforms, bbox, units);

  gradient.children?.forEach((stop) => {
    grad.stop(stop.props.offset, stop.props.stopColor, stop.props.stopOpacity);
  });

  ctx.fill(grad);
};

// Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L155
const setRadialGradientFill = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('fill' in node.props)) return;

  const bbox = getBoundingBox(node);
  const gradient = node.props?.fill as SafeRadialGradientNode;

  if (!gradient) return;

  const units = gradient.props.gradientUnits || 'objectBoundingBox';
  const transforms = gradient.props.gradientTransform || [];

  let r = gradient.props.r || 0.5;
  let cx = gradient.props.cx || 0.5;
  let cy = gradient.props.cy || 0.5;
  let fx = gradient.props.fx || cx;
  let fy = gradient.props.fy || cy;

  if (units === 'objectBoundingBox') {
    const m0 = bbox[2] - bbox[0];
    const m3 = bbox[3] - bbox[1];
    const m4 = bbox[0];
    const m5 = bbox[1];

    r = r * m0;
    cx = m0 * cx + m4;
    cy = m3 * cy + m5;
    fx = m0 * fx + m4;
    fy = m3 * fy + m5;
  }

  const grad = ctx.radialGradient(cx, cy, 0, fx, fy, r);

  transformGradient(grad, transforms, bbox, units);

  gradient.children?.forEach((stop) => {
    grad.stop(stop.props.offset, stop.props.stopColor, stop.props.stopOpacity);
  });

  ctx.fill(grad);
};

const setFillColor = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('fill' in node.props)) return;

  const fillColor = node.props?.fill as string;

  if (fillColor) ctx.fillColor(fillColor);
};

const setFill = (ctx: Context, node: SafeNode) => {
  if (hasLinearGradientFill(node)) return setLinearGradientFill(ctx, node);
  if (hasRadialGradientFill(node)) return setRadialGradientFill(ctx, node);

  return setFillColor(ctx, node);
};

const draw = (ctx: Context, node: SafeNode) => {
  const props = node.props || {};

  if ('fill' in props && 'stroke' in props && props.fill && props.stroke) {
    ctx.fillAndStroke(props.fillRule);
  } else if ('fill' in props && props.fill) {
    ctx.fill(props.fillRule);
  } else if ('stroke' in props && props.stroke) {
    ctx.stroke();
  } else {
    ctx.save();
    ctx.opacity(0);
    ctx.fill(null!);
    ctx.restore();
  }
};

const noop = () => {};

const renderFns: Partial<Record<Primitives, any>> = {
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

const renderNode = (ctx: Context, node: SafeNode) => {
  const renderFn = renderFns[node.type];

  if (renderFn) {
    renderFn(ctx, node);
  } else {
    console.warn(`SVG node of type ${node.type} is not currently supported`);
  }
};

const drawNode = (ctx: Context, node: SafeNode) => {
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

const clipPath = (ctx: Context, node: SafeNode) => {
  if (!node.props) return;
  if (!('clipPath' in node.props)) return;

  const value = node.props.clipPath;

  if (value) {
    const children = value.children || [];
    children.forEach((child) => renderNode(ctx, child));
    ctx.clip();
  }
};

const drawChildren = (ctx: Context, node: SafeNode) => {
  const children = node.children || [];

  children.forEach((child) => {
    ctx.save();

    clipPath(ctx, child);
    drawNode(ctx, child);
    drawChildren(ctx, child);

    ctx.restore();
  });
};

const resolveAspectRatio = (ctx: Context, node: SafeSvgNode) => {
  if (!node.box) return;

  const { width, height } = node.box;
  const { viewBox, preserveAspectRatio } = node.props;
  const { meetOrSlice = 'meet', align = 'xMidYMid' } =
    preserveAspectRatio || {};

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

const moveToOrigin = (ctx: Context, node: SafeSvgNode) => {
  if (!node.box) return;

  const { top, left } = node.box;

  const paddingLeft = node.box.paddingLeft || 0;
  const paddingTop = node.box.paddingTop || 0;

  ctx.translate(left + paddingLeft, top + paddingTop);
};

const renderSvg = (ctx: Context, node: SafeSvgNode) => {
  ctx.save();

  clipNode(ctx, node);
  moveToOrigin(ctx, node);
  resolveAspectRatio(ctx, node);
  drawChildren(ctx, node);

  ctx.restore();
};

export default renderSvg;
