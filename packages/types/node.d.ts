import { Style } from './style';
import { Primitive } from './primitive';
import { HyphenationCallback } from './font';
import { PageSize, Orientation } from './page';
import { Bookmark } from './bookmark';

interface BaseProps {
  id?: string;
  fixed?: boolean;
  break?: boolean;
  debug?: boolean;
  bookmark?: Bookmark;
  minPresenceAhead?: number;
}

type DynamicRenderCallback = (props: {
  pageNumber: number;
  totalPages: number;
}) => any;

interface TextProps extends BaseProps {
  wrap?: boolean;
  widows?: number;
  orphans?: number;
  render?: DynamicRenderCallback;
  hyphenationCallback?: HyphenationCallback;
}

interface ViewProps extends BaseProps {
  wrap?: boolean;
  render?: (props: { pageNumber: number }) => any;
}

interface PageProps extends BaseProps {
  wrap?: boolean;
  size?: PageSize;
  orientation?: Orientation;
  dpi?: number;
}

type PageLayout =
  | 'singlePage'
  | 'oneColumn'
  | 'twoColumnLeft'
  | 'twoColumnRight'
  | 'twoPageLeft'
  | 'twoPageRight';

type PageMode =
  | 'useNone'
  | 'useOutlines'
  | 'useThumbs'
  | 'fullScreen'
  | 'useOC'
  | 'useAttachments';

interface DocumentProps {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  pageLayout?: PageLayout;
  pageMode?: PageMode;
}

interface TextInstanceNode {
  type: Primitive.TextInstance;
  value: string;
}

interface TextNode {
  type: Primitive.Text;
  lines?: any[];
  style?: Style;
  props?: TextProps;
  children?: TextInstanceNode[];
}

interface ViewNode {
  type: Primitive.View;
  style?: Style;
  props?: ViewProps;
  children?: (ViewNode | TextNode)[];
}

interface PageNode {
  type: Primitive.Page;
  style?: Style;
  props?: PageProps;
  children?: (ViewNode | TextNode)[];
}

export interface DocumentNode {
  type: Primitive.Document;
  props?: DocumentProps;
  children: PageNode[];
}

export type Node = DocumentNode | PageNode | ViewNode;
