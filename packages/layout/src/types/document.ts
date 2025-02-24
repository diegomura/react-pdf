import * as P from '@react-pdf/primitives';

import { PageNode, SafePageNode } from './page';
import { YogaInstance } from './base';

export type DocumentProps = {
  bookmark?: never;
};

export type DocumentNode = {
  type: typeof P.Document;
  props: DocumentProps;
  box?: never;
  origin?: never;
  style?: never;
  yoga?: YogaInstance;
  yogaNode?: never;
  children: PageNode[];
};

export type SafeDocumentNode = Omit<DocumentNode, 'children'> & {
  children: SafePageNode[];
};
