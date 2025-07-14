import * as P from '@react-pdf/primitives';
import { SafeStyle, Style, StyleProp } from '@react-pdf/stylesheet';

import { YogaNode } from 'yoga-layout/load';

import { Box, NodeProps, Origin } from './base';

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
  style?: StyleProp<Style | Style[]>;
  box?: Box;
  origin?: Origin;
  yogaNode?: YogaNode;
  children?: never[];
};

export type SafeCanvasNode = Omit<CanvasNode, 'style'> & {
  style: SafeStyle;
};
