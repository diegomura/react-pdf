import { SafeStyle, Style, StyleProp } from '@react-pdf/stylesheet';
import * as P from '@react-pdf/primitives';
import { YogaNode } from 'yoga-layout/load';

import { Box, NodeProps, Origin, RenderProp } from './base';
import { ImageNode, SafeImageNode } from './image';
import { SafeTextNode, TextNode } from './text';
import { SafeTextInstanceNode, TextInstanceNode } from './text-instance';
import { SafeViewNode, ViewNode } from './view';

interface LinkProps extends NodeProps {
  /**
   * Enable/disable page wrapping for element.
   * @see https://react-pdf.org/components#page-wrapping
   */
  wrap?: boolean;
  href?: string;
  src?: string;
  render?: RenderProp;
}

export type LinkNode = {
  type: typeof P.Link;
  props: LinkProps;
  style?: StyleProp<Style | Style[]>;
  box?: Box;
  origin?: Origin;
  yogaNode?: YogaNode;
  children?: (ViewNode | ImageNode | TextNode | TextInstanceNode)[];
};

export type SafeLinkNode = Omit<LinkNode, 'style' | 'children'> & {
  style: SafeStyle;
  children?: (
    | SafeViewNode
    | SafeImageNode
    | SafeTextNode
    | SafeTextInstanceNode
  )[];
};
