import { SafeStyle, Style } from '@react-pdf/stylesheet';
import { SrcSet, Sizes } from '@react-pdf/types';
import * as P from '@react-pdf/primitives';
import { YogaNode } from 'yoga-layout/load';

import { Box, NodeProps, Origin } from './base';
import { Image } from '@react-pdf/image';
import { SourceObject } from './image';
import { ImageNode, SafeImageNode } from './image';
import { ViewNode, SafeViewNode } from './view';
import { TextNode, SafeTextNode } from './text';
import { LinkNode, SafeLinkNode } from './link';
import { CanvasNode, SafeCanvasNode } from './canvas';
import { FieldSetNode, SafeFieldSetNode } from './field-set';
import { TextInputNode, SafeTextInputNode } from './text-input';
import { ListNode, SafeListNode, SafeSelectNode, SelectNode } from './select';
import { CheckboxNode, SafeCheckboxNode } from './checkbox';
import { NoteNode, SafeNoteNode } from './note';

interface BaseImageBackgroundProps extends NodeProps {
  cache?: boolean;
  srcSet?: SrcSet;
  sizes?: Sizes;
  imageStyle?: Style;
  wrap?: boolean;
}

interface ImageBackgroundWithSrcProp extends BaseImageBackgroundProps {
  src: SourceObject;
  source?: never;
}

interface ImageBackgroundWithSourceProp extends BaseImageBackgroundProps {
  source: SourceObject;
  src?: never;
}

export type ImageBackgroundProps =
  | ImageBackgroundWithSrcProp
  | ImageBackgroundWithSourceProp;

export type ImageBackgroundNode = {
  type: typeof P.ImageBackground;
  props: ImageBackgroundProps;
  image?: Image;
  style?: Style | Style[];
  box?: Box;
  origin?: Origin;
  yogaNode?: YogaNode;
  children?: (
    | ViewNode
    | ImageNode
    | TextNode
    | LinkNode
    | CanvasNode
    | FieldSetNode
    | TextInputNode
    | SelectNode
    | ListNode
    | CheckboxNode
    | NoteNode
  )[];
};

export type SafeImageBackgroundNode = Omit<
  ImageBackgroundNode,
  'style' | 'children'
> & {
  style: SafeStyle;
  children?: (
    | SafeViewNode
    | SafeImageNode
    | SafeTextNode
    | SafeLinkNode
    | SafeCanvasNode
    | SafeFieldSetNode
    | SafeTextInputNode
    | SafeSelectNode
    | SafeListNode
    | SafeCheckboxNode
    | SafeNoteNode
  )[];
};
