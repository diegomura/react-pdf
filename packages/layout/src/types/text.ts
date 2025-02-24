import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';
import { HyphenationCallback } from '@react-pdf/font';
import { YogaNode } from 'yoga-layout/load';
import { Paragraph } from '@react-pdf/textkit';

import { Box, NodeProps, Origin, RenderProp } from './base';
import { SafeTextInstanceNode, TextInstanceNode } from './text-instance';
import { ImageNode, SafeImageNode } from './image';
import { SafeTspanNode, TspanNode } from './tspan';

interface TextProps extends NodeProps {
  /**
   * Enable/disable page wrapping for element.
   * @see https://react-pdf.org/components#page-wrapping
   */
  wrap?: boolean;
  render?: RenderProp;
  /**
   * Override the default hyphenation-callback
   * @see https://react-pdf.org/fonts#registerhyphenationcallback
   */
  hyphenationCallback?: HyphenationCallback;
  /**
   * Specifies the minimum number of lines in a text element that must be shown at the bottom of a page or its container.
   * @see https://react-pdf.org/advanced#orphan-&-widow-protection
   */
  orphans?: number;
  /**
   * Specifies the minimum number of lines in a text element that must be shown at the top of a page or its container..
   * @see https://react-pdf.org/advanced#orphan-&-widow-protection
   */
  widows?: number;
  // Svg props
  x?: number;
  y?: number;
}

export type TextNode = {
  type: typeof P.Text;
  props: TextProps;
  style?: Style | Style[];
  box?: Box;
  origin?: Origin;
  yogaNode?: YogaNode;
  lines?: Paragraph;
  alignOffset?: number; // TODO: Remove this
  children?: (TextNode | TextInstanceNode | ImageNode | TspanNode)[];
};

export type SafeTextNode = Omit<TextNode, 'style' | 'children'> & {
  style: SafeStyle;
  children?: (
    | SafeTextNode
    | SafeTextInstanceNode
    | SafeImageNode
    | SafeTspanNode
  )[];
};
