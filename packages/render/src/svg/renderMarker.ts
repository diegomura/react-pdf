import * as P from '@react-pdf/primitives';
import { SafeMarkerNode, SafeNode } from '@react-pdf/layout';

import { Context } from '../types';
import getMarkerPoints, { MarkerPoint } from './getMarkerPoints';

type DrawNodeFn = (ctx: Context, node: SafeNode) => void;

const RAD_TO_DEG = 180 / Math.PI;
const DEFAULT_MARKER_WIDTH = 3;
const DEFAULT_MARKER_HEIGHT = 3;

const drawMarkerChildren = (
  ctx: Context,
  node: SafeNode,
  drawNode: DrawNodeFn,
) => {
  const children = node.children || [];

  children.forEach((child) => {
    ctx.save();
    drawNode(ctx, child);
    drawMarkerChildren(ctx, child, drawNode);
    ctx.restore();
  });
};

const renderMarkerInstance = (
  ctx: Context,
  marker: SafeMarkerNode,
  point: MarkerPoint,
  strokeWidth: number,
  isStart: boolean,
  drawNode: DrawNodeFn,
) => {
  const props = marker.props || {};
  const markerWidth = props.markerWidth ?? DEFAULT_MARKER_WIDTH;
  const markerHeight = props.markerHeight ?? DEFAULT_MARKER_HEIGHT;
  const refX = props.refX ?? 0;
  const refY = props.refY ?? 0;
  const orient = props.orient ?? 0;
  const markerUnits = props.markerUnits ?? 'strokeWidth';
  const viewBox = props.viewBox;

  ctx.save();

  // 1. Translate to vertex position
  ctx.translate(point.x, point.y);

  // 2. Rotate based on orient (ctx.rotate expects degrees)
  if (orient === 'auto') {
    ctx.rotate(point.angle * RAD_TO_DEG);
  } else if (orient === 'auto-start-reverse') {
    const angle = isStart ? point.angle + Math.PI : point.angle;
    ctx.rotate(angle * RAD_TO_DEG);
  } else {
    const angle = typeof orient === 'number' ? orient : 0;
    ctx.rotate(angle);
  }

  // 3. Scale for markerUnits
  if (markerUnits === 'strokeWidth') {
    ctx.scale(strokeWidth, strokeWidth);
  }

  // 4. Apply viewBox mapping and refX/refY offset
  if (viewBox) {
    const scaleX = markerWidth / viewBox.maxX;
    const scaleY = markerHeight / viewBox.maxY;
    ctx.scale(scaleX, scaleY);
    ctx.translate(-viewBox.minX - refX, -viewBox.minY - refY);
  } else {
    ctx.translate(-refX, -refY);
  }

  // 5. Render marker children
  drawMarkerChildren(ctx, marker as SafeNode, drawNode);

  ctx.restore();
};

const hasMarkers = (node: SafeNode): boolean => {
  if (!node.props) return false;

  return (
    ('markerStart' in node.props && !!node.props.markerStart) ||
    ('markerMid' in node.props && !!node.props.markerMid) ||
    ('markerEnd' in node.props && !!node.props.markerEnd)
  );
};

const MARKER_TYPES = new Set([P.Line, P.Polyline, P.Polygon, P.Path]);

const renderMarkers = (ctx: Context, node: SafeNode, drawNode: DrawNodeFn) => {
  if (!hasMarkers(node)) return;
  if (!MARKER_TYPES.has(node.type)) return;

  const points = getMarkerPoints(node);
  if (!points) return;

  const strokeWidth =
    ('strokeWidth' in (node.props || {}) && (node.props as any).strokeWidth) ||
    1;

  const props = node.props || {};

  if ('markerStart' in props && props.markerStart && points.start) {
    renderMarkerInstance(
      ctx,
      props.markerStart as SafeMarkerNode,
      points.start,
      strokeWidth,
      true,
      drawNode,
    );
  }

  if ('markerMid' in props && props.markerMid && points.mid) {
    const marker = props.markerMid as SafeMarkerNode;
    points.mid.forEach((point) => {
      renderMarkerInstance(ctx, marker, point, strokeWidth, false, drawNode);
    });
  }

  if ('markerEnd' in props && props.markerEnd && points.end) {
    renderMarkerInstance(
      ctx,
      props.markerEnd as SafeMarkerNode,
      points.end,
      strokeWidth,
      false,
      drawNode,
    );
  }
};

export default renderMarkers;
