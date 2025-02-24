import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';

import { NodeProps, Origin } from './base';

interface CanvasProps extends NodeProps {
  paint: (
    painter: any,
    availableWidth?: number,
    availableHeight?: number,
  ) => null;
}

export type CanvasNode = {
  type: typeof P.Canvas;
  props: CanvasProps;
  style?: Style | Style[];
  box?: never;
  origin?: Origin;
  yogaNode?: never;
  children?: never[];
};

export type SafeCanvasNode = Omit<CanvasNode, 'style'> & {
  style: SafeStyle;
};
