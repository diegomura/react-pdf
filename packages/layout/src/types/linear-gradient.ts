import * as P from '@react-pdf/primitives';
import { Transform } from '@react-pdf/stylesheet';

import { SafeStopNode, StopNode } from './stop';
interface LinearGradientProps {
  id: string;
  x1?: string | number;
  x2?: string | number;
  y1?: string | number;
  y2?: string | number;
  xlinkHref?: string;
  gradientTransform?: string;
  gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
}

interface SafeLinearGradientProps {
  id: string;
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
  xlinkHref?: string;
  gradientTransform?: Transform[];
  gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
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
