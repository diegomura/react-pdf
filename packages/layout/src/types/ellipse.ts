import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';

import { SVGPresentationAttributes } from './base';

interface EllipseProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes;
  cx?: string | number;
  cy?: string | number;
  rx: string | number;
  ry: string | number;
}

export type EllipseNode = {
  type: typeof P.Ellipse;
  props: EllipseProps;
  style?: Style | Style[];
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: never[];
};

export type SafeEllipseNode = Omit<EllipseNode, 'style'> & {
  style: SafeStyle;
};
