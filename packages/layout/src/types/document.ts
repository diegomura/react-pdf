import * as P from '@react-pdf/primitives';

import { PageNode, SafePageNode } from './page';
import { YogaInstance } from './base';
import { SafeStyle, Style } from '@react-pdf/stylesheet';

export type PDFVersion = '1.3' | '1.4' | '1.5' | '1.6' | '1.7' | '1.7ext3';

export type PageLayout =
  | 'singlePage'
  | 'oneColumn'
  | 'twoColumnLeft'
  | 'twoColumnRight'
  | 'twoPageLeft'
  | 'twoPageRight';

export type PageMode =
  | 'useNone'
  | 'useOutlines'
  | 'useThumbs'
  | 'fullScreen'
  | 'useOC'
  | 'useAttachments';

export interface OnRenderProps {
  blob?: Blob;
}

export type DocumentProps = {
  bookmark?: never;
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  keywords?: string;
  producer?: string;
  language?: string;
  creationDate?: Date;
  modificationDate?: Date;
  pdfVersion?: PDFVersion;
  pageMode?: PageMode;
  pageLayout?: PageLayout;
  onRender?: (props: OnRenderProps) => any;
};

export type DocumentNode = {
  type: typeof P.Document;
  props: DocumentProps;
  box?: never;
  origin?: never;
  style?: Style | Style[];
  yoga?: YogaInstance;
  yogaNode?: never;
  children: PageNode[];
};

export type SafeDocumentNode = Omit<DocumentNode, 'style' | 'children'> & {
  style: SafeStyle;
  children: SafePageNode[];
};
