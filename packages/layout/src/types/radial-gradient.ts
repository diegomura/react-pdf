import * as P from '@react-pdf/primitives';

import { SafeStopNode, StopNode } from './stop';

interface RadialGradientProps {
  id: string;
  cx?: string | number;
  cy?: string | number;
  fr?: string | number;
  fx?: string | number;
  fy?: string | number;
}

export type RadialGradientNode = {
  type: typeof P.RadialGradient;
  props: RadialGradientProps;
  style?: never;
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: StopNode[];
};

export type SafeRadialGradientNode = Omit<RadialGradientNode, 'children'> & {
  children?: SafeStopNode[];
};
