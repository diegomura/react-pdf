import * as P from '@react-pdf/primitives';

import { SafeStopNode, StopNode } from './stop';
import { Transform } from '@react-pdf/stylesheet';

interface RadialGradientProps {
  id: string;
  cx?: string | number;
  cy?: string | number;
  fr?: string | number;
  fx?: string | number;
  fy?: string | number;
  r?: string | number;
  xlinkHref?: string;
  gradientTransform?: string;
  gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
}

interface SafeRadialGradientProps {
  id: string;
  cx?: number;
  cy?: number;
  fr?: number;
  fx?: number;
  fy?: number;
  r?: number;
  xlinkHref?: string;
  gradientTransform?: Transform[];
  gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
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

export type SafeRadialGradientNode = Omit<
  RadialGradientNode,
  'props' | 'children'
> & {
  props: SafeRadialGradientProps;
  children?: SafeStopNode[];
};
