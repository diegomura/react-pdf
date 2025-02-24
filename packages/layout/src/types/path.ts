import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';

import { SVGPresentationAttributes } from './base';

interface PathProps extends SVGPresentationAttributes {
  style?: SVGPresentationAttributes;
  d: string;
}

export type PathNode = {
  type: typeof P.Path;
  props: PathProps;
  style?: Style | Style[];
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: never[];
};

export type SafePathNode = Omit<PathNode, 'style'> & {
  style: SafeStyle;
};
