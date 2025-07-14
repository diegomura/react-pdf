import * as P from '@react-pdf/primitives';
import { SafeStyle, Style, StyleProp } from '@react-pdf/stylesheet';

import {
  SafeSVGPresentationAttributes,
  SVGPresentationAttributes,
} from './base';

interface PolygonProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes;
  points: string;
}

interface SafePolygonProps extends SafeSVGPresentationAttributes {
  style?: SafeSVGPresentationAttributes;
  points: string;
}

export type PolygonNode = {
  type: typeof P.Polygon;
  props: PolygonProps;
  style?: StyleProp<Style | Style[]>;
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: never[];
};

export type SafePolygonNode = Omit<PolygonNode, 'style' | 'props'> & {
  style: SafeStyle;
  props: SafePolygonProps;
};
