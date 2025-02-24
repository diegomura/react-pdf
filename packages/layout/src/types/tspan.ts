import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';

import { SVGPresentationAttributes } from './base';
import { SafeTextInstanceNode, TextInstanceNode } from './text-instance';

interface TspanProps extends SVGPresentationAttributes {
  x?: string | number;
  y?: string | number;
}

export type TspanNode = {
  type: typeof P.Tspan;
  props: TspanProps;
  style?: Style | Style[];
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: TextInstanceNode[];
};

export type SafeTspanNode = Omit<TspanNode, 'style' | 'children'> & {
  style: SafeStyle;
  children?: SafeTextInstanceNode[];
};
