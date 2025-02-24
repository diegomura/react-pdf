import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';

import { SVGPresentationAttributes } from './base';

interface PolylineProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes;
  points: string;
}

export type PolylineNode = {
  type: typeof P.Polyline;
  props: PolylineProps;
  style?: Style | Style[];
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: never[];
};

export type SafePolylineNode = Omit<PolylineNode, 'style'> & {
  style: SafeStyle;
};
