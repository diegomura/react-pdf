import * as fontkit from 'fontkit';

export type Font = Omit<fontkit.Font, 'type'> & {
  type: 'TTF' | 'WOFF' | 'WOFF2' | 'STANDARD';
  encode?: (string: string) => number[];
};

export type FontStyle = 'normal' | 'italic' | 'oblique';

export type FontWeight =
  | number
  | 'thin'
  | 'ultralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'ultrabold'
  | 'heavy';

export type FontDescriptor = {
  fontFamily: string;
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
};

export type RemoteOptions = {
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
};

export type FontSourceOptions = {
  postscriptName?: string;
} & RemoteOptions;

export type FontSource = {
  src: string;
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
} & FontSourceOptions;

export type SingleLoad = {
  family: string;
} & FontSource;

export type BulkLoad = {
  family: string;
  fonts: FontSource[];
};

interface EmojiSourceUrl {
  url: string;
  format?: string;
  withVariationSelectors?: boolean;
}

interface EmojiSourceBuilder {
  builder: (code: string) => string;
  withVariationSelectors?: boolean;
}

export type EmojiSource = EmojiSourceUrl | EmojiSourceBuilder;

export type HyphenationCallback = (word: string) => string[];
