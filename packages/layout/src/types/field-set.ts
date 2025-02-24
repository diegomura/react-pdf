import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';
import { YogaNode } from 'yoga-layout/load';

import { Box, NodeProps, Origin } from './base';
import { SafeTextNode, TextNode } from './text';
import { SafeViewNode, ViewNode } from './view';
import { SafeTextInputNode, TextInputNode } from './text-input';

interface FieldSetProps extends NodeProps {
  name: string;
}

export type FieldSetNode = {
  type: typeof P.FieldSet;
  props: FieldSetProps;
  style?: Style | Style[];
  box?: Box;
  origin?: Origin;
  yogaNode?: YogaNode;
  children?: (TextNode | ViewNode | TextInputNode)[];
};

export type SafeFieldSetNode = Omit<FieldSetNode, 'style' | 'children'> & {
  style: SafeStyle;
  children?: (SafeTextNode | SafeViewNode | SafeTextInputNode)[];
};
