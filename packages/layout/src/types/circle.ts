import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';

import { Origin, SVGPresentationAttributes } from './base';

interface CircleProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes;
  cx?: string | number;
  cy?: string | number;
  r: string | number;
}

export type CircleNode = {
  type: typeof P.Circle;
  props: CircleProps;
  style?: Style | Style[];
  box?: never;
  origin?: Origin;
  yogaNode?: never;
  children?: never[];
};

export type SafeCircleNode = Omit<CircleNode, 'style'> & {
  style: SafeStyle;
};
