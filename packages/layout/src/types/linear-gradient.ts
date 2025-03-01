import * as P from '@react-pdf/primitives';

import { SafeStopNode, StopNode } from './stop';

interface LinearGradientProps {
  id: string;
  x1?: string | number;
  x2?: string | number;
  y1?: string | number;
  y2?: string | number;
}

interface SafeLinearGradientProps {
  id: string;
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

export type LinearGradientNode = {
  type: typeof P.LinearGradient;
  props: LinearGradientProps;
  style?: never;
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: StopNode[];
};

export type SafeLinearGradientNode = Omit<
  LinearGradientNode,
  'props' | 'children'
> & {
  props: SafeLinearGradientProps;
  children?: SafeStopNode[];
};
