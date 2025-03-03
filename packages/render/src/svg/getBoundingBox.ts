import * as P from '@react-pdf/primitives';
import absPath from 'abs-svg-path';
import parsePath from 'parse-svg-path';
import normalizePath from 'normalize-svg-path';

import parsePoints from './parsePoints';
import {
  SafeCircleNode,
  SafeEllipseNode,
  SafeLineNode,
  SafeNode,
  SafePathNode,
  SafePolylineNode,
  SafeRectNode,
} from '@react-pdf/layout';

type Primitives = (typeof P)[keyof typeof P];

// From https://github.com/dy/svg-path-bounds/blob/master/index.js
const getPathBoundingBox = (node: SafePathNode) => {
  const path = normalizePath(absPath(parsePath(node.props?.d || '')));

  if (!path.length) return [0, 0, 0, 0];

  const bounds = [Infinity, Infinity, -Infinity, -Infinity];

  for (let i = 0, l = path.length; i < l; i += 1) {
    const points = path[i].slice(1);

    for (let j = 0; j < points.length; j += 2) {
      if (points[j + 0] < bounds[0]) bounds[0] = points[j + 0];
      if (points[j + 1] < bounds[1]) bounds[1] = points[j + 1];
      if (points[j + 0] > bounds[2]) bounds[2] = points[j + 0];
      if (points[j + 1] > bounds[3]) bounds[3] = points[j + 1];
    }
  }

  return bounds;
};

const getCircleBoundingBox = (node: SafeCircleNode) => {
  const r = node.props?.r || 0;
  const cx = node.props?.cx || 0;
  const cy = node.props?.cy || 0;

  return [cx - r, cy - r, cx + r, cy + r];
};

const getEllipseBoundingBox = (node: SafeEllipseNode) => {
  const cx = node.props?.cx || 0;
  const cy = node.props?.cy || 0;
  const rx = node.props?.rx || 0;
  const ry = node.props?.ry || 0;

  return [cx - rx, cy - ry, cx + rx, cy + ry];
};

const getLineBoundingBox = (node: SafeLineNode) => {
  const x1 = node.props?.x1 || 0;
  const y1 = node.props?.y1 || 0;
  const x2 = node.props?.x2 || 0;
  const y2 = node.props?.y2 || 0;

  return [
    Math.min(x1, x2),
    Math.min(y1, y2),
    Math.max(x1, x2),
    Math.max(y1, y2),
  ];
};

const getRectBoundingBox = (node: SafeRectNode) => {
  const x = node.props?.x || 0;
  const y = node.props?.y || 0;
  const width = node.props?.width || 0;
  const height = node.props?.height || 0;

  return [x, y, x + width, y + height];
};

const max = (values: number[]) => Math.max(-Infinity, ...values);
const min = (values: number[]) => Math.min(Infinity, ...values);

const getPolylineBoundingBox = (node: SafePolylineNode) => {
  const points = parsePoints(node.props?.points);

  const xValues = points.map((p) => p[0]);
  const yValues = points.map((p) => p[1]);

  return [min(xValues), min(yValues), max(xValues), max(yValues)];
};

const boundingBoxFns: Partial<Record<Primitives, any>> = {
  [P.Rect]: getRectBoundingBox,
  [P.Line]: getLineBoundingBox,
  [P.Path]: getPathBoundingBox,
  [P.Circle]: getCircleBoundingBox,
  [P.Ellipse]: getEllipseBoundingBox,
  [P.Polygon]: getPolylineBoundingBox,
  [P.Polyline]: getPolylineBoundingBox,
};

const getBoundingBox = (node: SafeNode): number[] => {
  const boundingBoxFn = boundingBoxFns[node.type];
  return boundingBoxFn ? boundingBoxFn(node) : [0, 0, 0, 0];
};

export default getBoundingBox;
