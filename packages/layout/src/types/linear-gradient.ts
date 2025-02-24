import * as P from '@react-pdf/primitives';

import { SafeStopNode, StopNode } from './stop';

interface LinearGradientProps {
  id: string;
  x1?: string | number;
  x2?: string | number;
  y1?: string | number;
  y2?: string | number;
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

export type SafeLinearGradientNode = Omit<LinearGradientNode, 'children'> & {
  children?: SafeStopNode[];
};
