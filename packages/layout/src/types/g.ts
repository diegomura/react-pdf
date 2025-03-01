import { SafeStyle, Style } from '@react-pdf/stylesheet';
import * as P from '@react-pdf/primitives';

import { LineNode, SafeLineNode } from './line';
import { PolylineNode, SafePolylineNode } from './polyline';
import { PolygonNode, SafePolygonNode } from './polygon';
import { PathNode, SafePathNode } from './path';
import { RectNode, SafeRectNode } from './rect';
import { CircleNode, SafeCircleNode } from './circle';
import { EllipseNode, SafeEllipseNode } from './ellipse';
import { SafeTspanNode, TspanNode } from './tspan';
import { ImageNode, SafeImageNode } from './image';
import { SafeTextNode, TextNode } from './text';
import {
  SVGPresentationAttributes,
  SafeSVGPresentationAttributes,
} from './base';

interface GProps extends SVGPresentationAttributes {
  style?: Style | Style[];
}

interface SafeGProps extends SafeSVGPresentationAttributes {
  style?: Style;
}

export type GNode = {
  type: typeof P.G;
  props: GProps;
  style?: Style | Style[];
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
    | ImageNode
    | TextNode
    | TspanNode
    | GNode
  )[];
};

export type SafeGNode = Omit<GNode, 'style' | 'props' | 'children'> & {
  style: SafeStyle;
  props: SafeGProps;
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
  )[];
};
