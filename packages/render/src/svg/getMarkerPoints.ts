import * as P from '@react-pdf/primitives';
import {
  SafeLineNode,
  SafeNode,
  SafePathNode,
  SafePolygonNode,
  SafePolylineNode,
} from '@react-pdf/layout';
import absPath from 'abs-svg-path';
import parsePath from 'parse-svg-path';
import normalizePath from 'normalize-svg-path';

import parsePoints from './parsePoints';

export type MarkerPoint = {
  x: number;
  y: number;
  angle: number;
};

export type MarkerPoints = {
  start?: MarkerPoint;
  mid?: MarkerPoint[];
  end?: MarkerPoint;
};

const angleBetween = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.atan2(y2 - y1, x2 - x1);
};

const bisectAngle = (inAngle: number, outAngle: number) => {
  // Average of incoming and outgoing angles
  let diff = outAngle - inAngle;

  // Normalize to [-PI, PI]
  while (diff > Math.PI) diff -= 2 * Math.PI;
  while (diff < -Math.PI) diff += 2 * Math.PI;

  return inAngle + diff / 2;
};

const getLineMarkerPoints = (node: SafeLineNode): MarkerPoints => {
  const x1 = node.props?.x1 || 0;
  const y1 = node.props?.y1 || 0;
  const x2 = node.props?.x2 || 0;
  const y2 = node.props?.y2 || 0;

  const angle = angleBetween(x1, y1, x2, y2);

  return {
    start: { x: x1, y: y1, angle },
    end: { x: x2, y: y2, angle },
  };
};

const getPointListMarkerPoints = (
  points: number[][],
  closed: boolean,
): MarkerPoints => {
  if (points.length === 0) return {};
  if (points.length === 1)
    return { start: { x: points[0][0], y: points[0][1], angle: 0 } };

  const n = points.length;
  const result: MarkerPoints = {};

  // Start point
  const startOutAngle = angleBetween(
    points[0][0],
    points[0][1],
    points[1][0],
    points[1][1],
  );

  if (closed) {
    const startInAngle = angleBetween(
      points[n - 1][0],
      points[n - 1][1],
      points[0][0],
      points[0][1],
    );
    result.start = {
      x: points[0][0],
      y: points[0][1],
      angle: bisectAngle(startInAngle, startOutAngle),
    };
  } else {
    result.start = { x: points[0][0], y: points[0][1], angle: startOutAngle };
  }

  // Mid points
  if (n > 2) {
    result.mid = [];
    for (let i = 1; i < n - 1; i++) {
      const inAngle = angleBetween(
        points[i - 1][0],
        points[i - 1][1],
        points[i][0],
        points[i][1],
      );
      const outAngle = angleBetween(
        points[i][0],
        points[i][1],
        points[i + 1][0],
        points[i + 1][1],
      );
      result.mid.push({
        x: points[i][0],
        y: points[i][1],
        angle: bisectAngle(inAngle, outAngle),
      });
    }
  }

  // End point
  const endInAngle = angleBetween(
    points[n - 2][0],
    points[n - 2][1],
    points[n - 1][0],
    points[n - 1][1],
  );

  if (closed) {
    const endOutAngle = angleBetween(
      points[n - 1][0],
      points[n - 1][1],
      points[0][0],
      points[0][1],
    );
    result.end = {
      x: points[n - 1][0],
      y: points[n - 1][1],
      angle: bisectAngle(endInAngle, endOutAngle),
    };
  } else {
    result.end = {
      x: points[n - 1][0],
      y: points[n - 1][1],
      angle: endInAngle,
    };
  }

  return result;
};

const getPolylineMarkerPoints = (node: SafePolylineNode): MarkerPoints => {
  const points = parsePoints(node.props?.points);
  return getPointListMarkerPoints(points, false);
};

const getPolygonMarkerPoints = (node: SafePolygonNode): MarkerPoints => {
  const points = parsePoints(node.props?.points);
  return getPointListMarkerPoints(points, true);
};

const getPathMarkerPoints = (node: SafePathNode): MarkerPoints => {
  const d = node.props?.d;
  if (!d) return {};

  const path = normalizePath(absPath(parsePath(d)));
  if (!path.length) return {};

  // Extract vertices and tangent info from normalized path (M and C commands)
  const vertices: {
    x: number;
    y: number;
    inAngle?: number;
    outAngle?: number;
  }[] = [];

  let cx = 0;
  let cy = 0;

  for (let i = 0; i < path.length; i++) {
    const cmd = path[i];

    if (cmd[0] === 'M') {
      cx = cmd[1];
      cy = cmd[2];
      vertices.push({ x: cx, y: cy });
    } else if (cmd[0] === 'C') {
      const cp1x = cmd[1];
      const cp1y = cmd[2];
      const cp2x = cmd[3];
      const cp2y = cmd[4];
      const ex = cmd[5];
      const ey = cmd[6];

      // Outgoing tangent at previous vertex
      const prev = vertices[vertices.length - 1];
      if (prev) {
        // Direction from current point to first control point
        const dx = cp1x - cx;
        const dy = cp1y - cy;
        // If control point coincides with current point, use endpoint
        if (Math.abs(dx) > 1e-6 || Math.abs(dy) > 1e-6) {
          prev.outAngle = Math.atan2(dy, dx);
        } else {
          prev.outAngle = Math.atan2(ey - cy, ex - cx);
        }
      }

      // Incoming tangent at endpoint
      const dx2 = ex - cp2x;
      const dy2 = ey - cp2y;
      let inAngle: number;
      if (Math.abs(dx2) > 1e-6 || Math.abs(dy2) > 1e-6) {
        inAngle = Math.atan2(dy2, dx2);
      } else {
        inAngle = Math.atan2(ey - cy, ex - cx);
      }

      vertices.push({ x: ex, y: ey, inAngle });
      cx = ex;
      cy = ey;
    }
  }

  if (vertices.length === 0) return {};
  if (vertices.length === 1) {
    return { start: { x: vertices[0].x, y: vertices[0].y, angle: 0 } };
  }

  const n = vertices.length;
  const result: MarkerPoints = {};

  // Start point: use outgoing angle
  const startAngle = vertices[0].outAngle ?? 0;
  result.start = { x: vertices[0].x, y: vertices[0].y, angle: startAngle };

  // Mid points
  if (n > 2) {
    result.mid = [];
    for (let i = 1; i < n - 1; i++) {
      const v = vertices[i];
      const inA = v.inAngle ?? 0;
      const outA = v.outAngle ?? inA;
      result.mid.push({
        x: v.x,
        y: v.y,
        angle: bisectAngle(inA, outA),
      });
    }
  }

  // End point: use incoming angle
  const endAngle = vertices[n - 1].inAngle ?? 0;
  result.end = { x: vertices[n - 1].x, y: vertices[n - 1].y, angle: endAngle };

  return result;
};

type Primitives = (typeof P)[keyof typeof P];

const markerPointFns: Partial<
  Record<Primitives, (node: SafeNode) => MarkerPoints>
> = {
  [P.Line]: getLineMarkerPoints as (node: SafeNode) => MarkerPoints,
  [P.Polyline]: getPolylineMarkerPoints as (node: SafeNode) => MarkerPoints,
  [P.Polygon]: getPolygonMarkerPoints as (node: SafeNode) => MarkerPoints,
  [P.Path]: getPathMarkerPoints as (node: SafeNode) => MarkerPoints,
};

const getMarkerPoints = (node: SafeNode): MarkerPoints | null => {
  const fn = markerPointFns[node.type];
  return fn ? fn(node) : null;
};

export default getMarkerPoints;
