import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';
import { YogaNode } from 'yoga-layout/load';

import { Box, NodeProps, Origin, RenderProp } from './base';
import { ImageNode, SafeImageNode } from './image';
import { SafeTextNode, TextNode } from './text';
import { LinkNode, SafeLinkNode } from './link';
import { CanvasNode, SafeCanvasNode } from './canvas';
import { FieldSetNode, SafeFieldSetNode } from './field-set';
import { SafeTextInputNode, TextInputNode } from './text-input';
import { ListNode, SafeListNode, SafeSelectNode, SelectNode } from './select';
import { CheckboxNode } from './checkbox';
import { NoteNode, SafeNoteNode } from './note';

interface ViewProps extends NodeProps {
  id?: string;
  /**
   * Enable/disable page wrapping for element.
   * @see https://react-pdf.org/components#page-wrapping
   */
  wrap?: boolean;
  render?: RenderProp;
}

export type ViewNode = {
  type: typeof P.View;
  props: ViewProps;
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

export type SafeViewNode = Omit<ViewNode, 'style' | 'children'> & {
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
    | SafeCanvasNode
    | SafeNoteNode
  )[];
};
