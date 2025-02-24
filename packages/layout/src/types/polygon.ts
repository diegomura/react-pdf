import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';

import { SVGPresentationAttributes } from './base';

interface PolygonProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes;
  points: string;
}

export type PolygonNode = {
  type: typeof P.Polygon;
  props: PolygonProps;
  style?: Style | Style[];
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: never[];
};

export type SafePolygonNode = Omit<PolygonNode, 'style'> & {
  style: SafeStyle;
};
