import { SafeStyle, Style, StyleProp } from '@react-pdf/stylesheet';
import * as P from '@react-pdf/primitives';
import { YogaNode } from 'yoga-layout/load';

import {
  Box,
  Origin,
  NodeProps,
  SVGPresentationAttributes,
  SafeSVGPresentationAttributes,
} from './base';
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
import { SafeTextNode, TextNode } from './text';
import { ImageNode, SafeImageNode } from './image';

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
  preserveAspectRatio?: string;
}

interface SvgSafeProps extends NodeProps, SafeSVGPresentationAttributes {
  width?: string | number;
  height?: string | number;
  viewBox?: Viewbox;
  preserveAspectRatio?: PreserveAspectRatio;
}

export type SvgNode = {
  type: typeof P.Svg;
  props: SvgProps;
  style?: StyleProp<Style | Style[]>;
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
    | ImageNode
    | TextNode
    | TspanNode
    | GNode
    | DefsNode
  )[];
};

export type SafeSvgNode = Omit<SvgNode, 'style' | 'props' | 'children'> & {
  style: SafeStyle;
  props: SvgSafeProps;
  children?: (
    | SafeLineNode
    | SafePolylineNode
    | SafePolygonNode
    | SafePathNode
    | SafeRectNode
    | SafeCircleNode
    | SafeEllipseNode
    | SafeImageNode
    | SafeTextNode
    | SafeTspanNode
    | SafeGNode
    | SafeDefsNode
  )[];
};
