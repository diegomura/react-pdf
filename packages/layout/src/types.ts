import * as React from 'react';
import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';
import { HyphenationCallback } from '@react-pdf/font';

// Generics

type YogaNode = {
  getComputedPadding: (side: number) => number;
};

export type Box = {
  width: number;
  height?: number;

  // TODO: should be optional?
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
};

export interface ExpandedBookmark {
  title: string;
  top?: number;
  left?: number;
  zoom?: number;
  fit?: true | false;
  expanded?: true | false;
}

export type Bookmark = string | ExpandedBookmark;

type RenderProp = (props: {
  pageNumber: number;
  totalPages?: number;
  subPageNumber: number;
  subPageTotalPages?: number;
}) => React.ReactNode | null | undefined;

type Safe<T extends { children?: any[]; style?: any }> = Omit<
  T,
  'style' | 'children'
> & {
  style: [T['style']] extends [never] ? never : SafeStyle;
  children?: T['children'] extends Array<infer U>
    ? (U extends any ? Safe<U> : never)[]
    : T['children'];
};

type NodeProps = {
  id?: string;
  /**
   * Render component in all wrapped pages.
   * @see https://react-pdf.org/advanced#fixed-components
   */
  fixed?: boolean;
  /**
   * Force the wrapping algorithm to start a new page when rendering the
   * element.
   * @see https://react-pdf.org/advanced#page-breaks
   */
  break?: boolean;
  /**
   * Hint that no page wrapping should occur between all sibling elements following the element within n points
   * @see https://react-pdf.org/advanced#orphan-&-widow-protection
   */
  minPresenceAhead?: number;
  bookmark?: Bookmark;
};

// Text Instance

export type TextInstanceNode = {
  type: typeof P.TextInstance;
  props?: never;
  style?: never;
  box?: never;
  children?: never;
  yogaNode?: never;
  value: string;
};

export type SafeTextInstanceNode = TextInstanceNode;

// Text

interface TextProps extends NodeProps {
  id?: string;
  /**
   * Enable/disable page wrapping for element.
   * @see https://react-pdf.org/components#page-wrapping
   */
  wrap?: boolean;
  /**
   * Enables debug mode on page bounding box.
   * @see https://react-pdf.org/advanced#debugging
   */
  debug?: boolean;
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
}

export type TextNode = {
  type: typeof P.Text;
  props: TextProps;
  style?: Style | Style[];
  box?: Box;
  yogaNode?: YogaNode;
  children?: (TextNode | TextInstanceNode)[];
};

export type SafeTextNode = Safe<TextNode>;

// Link

interface LinkProps extends NodeProps {
  /**
   * Enable/disable page wrapping for element.
   * @see https://react-pdf.org/components#page-wrapping
   */
  wrap?: boolean;
  /**
   * Enables debug mode on page bounding box.
   * @see https://react-pdf.org/advanced#debugging
   */
  debug?: boolean;
  href?: string;
  src?: string;
  render?: RenderProp;
}

export type LinkNode = {
  type: typeof P.Link;
  props: LinkProps;
  style?: Style | Style[];
  box?: Box;
  yogaNode?: YogaNode;
  children?: (ViewNode | TextNode | TextInstanceNode)[];
};

export type SafeLinkNode = Safe<LinkNode>;

// View

interface ViewProps extends NodeProps {
  id?: string;
  /**
   * Enable/disable page wrapping for element.
   * @see https://react-pdf.org/components#page-wrapping
   */
  wrap?: boolean;
  /**
   * Enables debug mode on page bounding box.
   * @see https://react-pdf.org/advanced#debugging
   */
  debug?: boolean;
  render?: RenderProp;
}

export type ViewNode = {
  type: typeof P.View;
  props: ViewProps;
  style?: Style | Style[];
  box?: Box;
  yogaNode?: YogaNode;
  children?: (ViewNode | TextNode | LinkNode)[];
};

export type SafeViewNode = Safe<ViewNode>;

// Page

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
  /**
   * Enables debug mode on page bounding box.
   * @see https://react-pdf.org/advanced#debugging
   */
  debug?: boolean;
  size?: PageSize;
  orientation?: Orientation;
  dpi?: number;
}

export type PageNode = {
  type: typeof P.Page;
  props: PageProps;
  style?: Style | Style[];
  box?: Box;
  yogaNode?: YogaNode;
  children?: (ViewNode | TextNode | LinkNode)[];
};

export type SafePageNode = Safe<PageNode>;

// Document

export type DocumentNode = {
  type: 'DOCUMENT';
  props: object;
  box?: never;
  style?: never;
  yoga?: unknown;
  yogaNode?: never;
  children: PageNode[];
};

export type SafeDocumentNode = Safe<DocumentNode>;

export type Node =
  | DocumentNode
  | PageNode
  | ViewNode
  | LinkNode
  | TextNode
  | TextInstanceNode;

export type SafeNode =
  | SafeDocumentNode
  | SafePageNode
  | SafeViewNode
  | SafeLinkNode
  | SafeTextNode
  | SafeTextInstanceNode;
