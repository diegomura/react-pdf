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

export interface FontDescriptor {
  fontFamily: string;
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
}

interface FontSource {
  src: string;
  fontFamily: string | string[];
  fontStyle: FontStyle;
  fontWeight: number;
  data: any;
  loading: boolean;
  options: any;
}

interface FontInstance {
  family: string;
  sources: FontSource[];
}

export type HyphenationCallback = (
  words: string,
  glyphString: { [key: string]: any },
) => string[];

interface RegisteredFont {
  src: string;
  loaded: boolean;
  loading: boolean;
  data: any;
  [key: string]: any;
}

interface EmojiSourceUrl {
  url: string;
  format?: string;
  withVariationSelectors?: boolean;
}

interface EmojiSourceBuilder {
  builder: (code: string) => string;
  withVariationSelectors?: boolean;
}

type EmojiSource = EmojiSourceUrl | EmojiSourceBuilder;

interface SingleLoad {
  family: string;
  src: string;
  fontStyle?: string;
  fontWeight?: FontWeight;
  [key: string]: any;
}

interface BulkLoad {
  family: string;
  fonts: {
    src: string;
    fontStyle?: string;
    fontWeight?: FontWeight;
    [key: string]: any;
  }[];
}

export interface FontStore {
  clear: () => void;
  reset: () => void;
  getEmojiSource: () => EmojiSource;
  getRegisteredFonts: () => Record<string, FontInstance>;
  getRegisteredFontFamilies: () => string[];
  getHyphenationCallback: () => HyphenationCallback;
  register: (options: SingleLoad | BulkLoad) => void;
  load: (descriptor: FontDescriptor) => Promise<void>;
  registerEmojiSource: (emojiSource: EmojiSource) => void;
  getFont: (descriptor: FontDescriptor) => RegisteredFont | undefined;
  registerHyphenationCallback: (callback: HyphenationCallback) => void;
}
