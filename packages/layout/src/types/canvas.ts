import * as P from '@react-pdf/primitives';
import { SafeStyle, StyleProp } from '@react-pdf/stylesheet';

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
  style?: StyleProp;
  box?: Box;
  origin?: Origin;
  taffyNode?: bigint;
  children?: never[];
};

export type SafeCanvasNode = Omit<CanvasNode, 'style'> & {
  style: SafeStyle;
  wasSplit: boolean;
  stylesResolved?: boolean;
};
