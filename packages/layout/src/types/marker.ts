import * as P from '@react-pdf/primitives';

import { Viewbox } from './svg';
import { LineNode, SafeLineNode } from './line';
import { PolylineNode, SafePolylineNode } from './polyline';
import { PolygonNode, SafePolygonNode } from './polygon';
import { PathNode, SafePathNode } from './path';
import { RectNode, SafeRectNode } from './rect';
import { CircleNode, SafeCircleNode } from './circle';
import { EllipseNode, SafeEllipseNode } from './ellipse';
import { GNode, SafeGNode } from './g';

type MarkerOrient = 'auto' | 'auto-start-reverse' | number;

interface MarkerProps {
  id: string;
  viewBox?: string;
  refX?: string | number;
  refY?: string | number;
  markerWidth?: string | number;
  markerHeight?: string | number;
  orient?: MarkerOrient;
  markerUnits?: 'strokeWidth' | 'userSpaceOnUse';
}

interface SafeMarkerProps {
  id: string;
  viewBox?: Viewbox;
  refX?: number;
  refY?: number;
  markerWidth?: number;
  markerHeight?: number;
  orient?: MarkerOrient;
  markerUnits?: 'strokeWidth' | 'userSpaceOnUse';
}

export type MarkerNode = {
  type: typeof P.Marker;
  props: MarkerProps;
  style?: never;
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: (
    | LineNode
    | PolylineNode
    | PolygonNode
    | PathNode
    | RectNode
    | CircleNode
    | EllipseNode
    | GNode
  )[];
};

export type SafeMarkerNode = Omit<MarkerNode, 'props' | 'children'> & {
  props: SafeMarkerProps;
  children?: (
    | SafeLineNode
    | SafePolylineNode
    | SafePolygonNode
    | SafePathNode
    | SafeRectNode
    | SafeCircleNode
    | SafeEllipseNode
    | SafeGNode
  )[];
};
