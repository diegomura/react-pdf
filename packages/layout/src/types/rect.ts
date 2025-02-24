import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';

import { SVGPresentationAttributes } from './base';

interface RectProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes;
  x?: string | number;
  y?: string | number;
  width: string | number;
  height: string | number;
  rx?: string | number;
  ry?: string | number;
}

export type RectNode = {
  type: typeof P.Rect;
  props: RectProps;
  style?: Style | Style[];
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: never[];
};

export type SafeRectNode = Omit<RectNode, 'style'> & {
  style: SafeStyle;
};
