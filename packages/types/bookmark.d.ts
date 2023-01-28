interface ExpandedBookmark {
  title: string;
  top?: number;
  left?: number;
  zoom?: number;
  fit?: true | false;
  expanded?: true | false;
}

export type Bookmark = string | ExpandedBookmark;
