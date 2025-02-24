import { SafeStyle, Style } from '@react-pdf/stylesheet';
import * as P from '@react-pdf/primitives';
import { YogaNode } from 'yoga-layout/load';

import { Box, NodeProps, Origin, SVGPresentationAttributes } from './base';
import { LineNode, SafeLineNode } from './line';
import { PolylineNode, SafePolylineNode } from './polyline';
import { PolygonNode, SafePolygonNode } from './polygon';
import { PathNode, SafePathNode } from './path';
import { RectNode, SafeRectNode } from './rect';
import { CircleNode, SafeCircleNode } from './circle';
import { EllipseNode, SafeEllipseNode } from './ellipse';
import { SafeTspanNode, TspanNode } from './tspan';
import { GNode, SafeGNode } from './g';
import { DefsNode, SafeDefsNode } from './defs';

export type Viewbox = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export type PreserveAspectRatio = {
  align:
    | 'none'
    | 'xMinYMin'
    | 'xMidYMin'
    | 'xMaxYMin'
    | 'xMinYMid'
    | 'xMidYMid'
    | 'xMaxYMid'
    | 'xMinYMax'
    | 'xMidYMax'
    | 'xMaxYMax';
  meetOrSlice: 'meet' | 'slice';
};

interface SvgProps extends NodeProps, SVGPresentationAttributes {
  width?: string | number;
  height?: string | number;
  viewBox?: string | Viewbox;
  preserveAspectRatio?: string | PreserveAspectRatio;
}

export type SvgNode = {
  type: typeof P.Svg;
  props: SvgProps;
  style?: Style | Style[];
  box?: Box;
  origin?: Origin;
  yogaNode?: YogaNode;
  children?: (
    | LineNode
    | PolylineNode
    | PolygonNode
    | PathNode
    | RectNode
    | CircleNode
    | EllipseNode
    | TspanNode
    | GNode
    | DefsNode
  )[];
};

export type SafeSvgNode = Omit<SvgNode, 'style' | 'children'> & {
  style: SafeStyle;
  children?: (
    | SafeLineNode
    | SafePolylineNode
    | SafePolygonNode
    | SafePathNode
    | SafeRectNode
    | SafeCircleNode
    | SafeEllipseNode
    | SafeTspanNode
    | SafeGNode
    | SafeDefsNode
  )[];
};
