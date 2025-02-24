import * as P from '@react-pdf/primitives';

import { LineNode, SafeLineNode } from './line';
import { PolylineNode, SafePolylineNode } from './polyline';
import { PolygonNode, SafePolygonNode } from './polygon';
import { PathNode, SafePathNode } from './path';
import { RectNode, SafeRectNode } from './rect';
import { CircleNode, SafeCircleNode } from './circle';
import { EllipseNode, SafeEllipseNode } from './ellipse';

interface ClipPathProps {
  id?: string;
}

export type ClipPathNode = {
  type: typeof P.ClipPath;
  props: ClipPathProps;
  style: never;
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
  )[];
};

export type SafeClipPathNode = Omit<ClipPathNode, 'children'> & {
  children?: (
    | SafeLineNode
    | SafePolylineNode
    | SafePolygonNode
    | SafePathNode
    | SafeRectNode
    | SafeCircleNode
    | SafeEllipseNode
  )[];
};
