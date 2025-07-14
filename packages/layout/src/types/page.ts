import { SafeStyle, Style, StyleProp } from '@react-pdf/stylesheet';
import * as P from '@react-pdf/primitives';
import { YogaNode } from 'yoga-layout/load';

import type { Box, NodeProps, Origin } from './base';
import { ImageNode, SafeImageNode } from './image';
import { SafeViewNode, ViewNode } from './view';
import { SafeTextNode, TextNode } from './text';
import { LinkNode, SafeLinkNode } from './link';
import { CanvasNode, SafeCanvasNode } from './canvas';
import { FieldSetNode, SafeFieldSetNode } from './field-set';
import { SafeTextInputNode, TextInputNode } from './text-input';
import { ListNode, SafeListNode, SafeSelectNode, SelectNode } from './select';
import { CheckboxNode, SafeCheckboxNode } from './checkbox';
import { NoteNode, SafeNoteNode } from './note';

export type Orientation = 'portrait' | 'landscape';

export type StandardPageSize =
  | '4A0'
  | '2A0'
  | 'A0'
  | 'A1'
  | 'A2'
  | 'A3'
  | 'A4'
  | 'A5'
  | 'A6'
  | 'A7'
  | 'A8'
  | 'A9'
  | 'A10'
  | 'B0'
  | 'B1'
  | 'B2'
  | 'B3'
  | 'B4'
  | 'B5'
  | 'B6'
  | 'B7'
  | 'B8'
  | 'B9'
  | 'B10'
  | 'C0'
  | 'C1'
  | 'C2'
  | 'C3'
  | 'C4'
  | 'C5'
  | 'C6'
  | 'C7'
  | 'C8'
  | 'C9'
  | 'C10'
  | 'RA0'
  | 'RA1'
  | 'RA2'
  | 'RA3'
  | 'RA4'
  | 'SRA0'
  | 'SRA1'
  | 'SRA2'
  | 'SRA3'
  | 'SRA4'
  | 'EXECUTIVE'
  | 'FOLIO'
  | 'LEGAL'
  | 'LETTER'
  | 'TABLOID'
  | 'ID1';

type StaticSize = number | string;

export type PageSize =
  | number
  | StandardPageSize
  | [StaticSize]
  | [StaticSize, StaticSize]
  | { width: StaticSize; height?: StaticSize };

interface PageProps extends NodeProps {
  /**
   * Enable page wrapping for this page.
   * @see https://react-pdf.org/components#page-wrapping
   */
  wrap?: boolean;
  size?: PageSize;
  orientation?: Orientation;
  dpi?: number;
}

export type PageNode = {
  type: typeof P.Page;
  props: PageProps;
  style?: StyleProp<Style | Style[]>;
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

export type SafePageNode = Omit<PageNode, 'style' | 'children'> & {
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
