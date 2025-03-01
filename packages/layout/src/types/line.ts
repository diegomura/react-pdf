import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';

import {
  SVGPresentationAttributes,
  SafeSVGPresentationAttributes,
} from './base';

interface LineProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes;
  x1: string | number;
  x2: string | number;
  y1: string | number;
  y2: string | number;
}

interface SafeLineProps extends SafeSVGPresentationAttributes {
  style?: SafeSVGPresentationAttributes;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
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

export type SafeLineNode = Omit<LineNode, 'style' | 'props'> & {
  style: SafeStyle;
  props: SafeLineProps;
};
