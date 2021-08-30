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
  fontFamily: string;
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

interface EmojiSource {
  url: string;
  format: string;
}

interface SingleLoad {
  family: string;
  src: string;
  fontStyle?: string;
  fontWeight?: string | number;
  [key: string]: any;
}

interface BulkLoad {
  family: string;
  fonts: {
    src: string;
    fontStyle?: string;
    fontWeight?: string | number;
    [key: string]: any;
  }[];
}

export interface FontStore {
  clear: () => void;
  reset: () => void;
  getEmojiSource: () => EmojiSource;
  getRegisteredFonts: () => FontInstance[];
  getRegisteredFontFamilies: () => string[];
  getHyphenationCallback: () => HyphenationCallback;
  register: (options: SingleLoad | BulkLoad) => void;
  load: (descriptor: FontDescriptor) => Promise<void>;
  registerEmojiSource: (emojiSource: EmojiSource) => void;
  getFont: (descriptor: FontDescriptor) => RegisteredFont | undefined;
  registerHyphenationCallback: (callback: HyphenationCallback) => void;
}
