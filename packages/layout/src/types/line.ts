import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';

import { SVGPresentationAttributes } from './base';

interface LineProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes;
  x1: string | number;
  x2: string | number;
  y1: string | number;
  y2: string | number;
}

export type LineNode = {
  type: typeof P.Line;
  props: LineProps;
  style?: Style | Style[];
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: never[];
};

export type SafeLineNode = Omit<LineNode, 'style'> & {
  style: SafeStyle;
};
