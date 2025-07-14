import * as P from '@react-pdf/primitives';
import { SafeStyle, Style, StyleProp } from '@react-pdf/stylesheet';
import { Paragraph } from '@react-pdf/textkit';

import {
  SVGPresentationAttributes,
  SafeSVGPresentationAttributes,
} from './base';
import { SafeTextInstanceNode, TextInstanceNode } from './text-instance';

interface TspanProps extends SVGPresentationAttributes {
  x?: string | number;
  y?: string | number;
}

interface SafeTspanProps extends SafeSVGPresentationAttributes {
  x?: number;
  y?: number;
}

export type TspanNode = {
  type: typeof P.Tspan;
  props: TspanProps;
  style?: StyleProp<Style | Style[]>;
  box?: never;
  origin?: never;
  yogaNode?: never;
  lines?: Paragraph;
  children?: TextInstanceNode[];
};

export type SafeTspanNode = Omit<TspanNode, 'style' | 'props' | 'children'> & {
  style: SafeStyle;
  props: SafeTspanProps;
  children?: SafeTextInstanceNode[];
};
