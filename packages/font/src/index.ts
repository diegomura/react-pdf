import FontFamily from './font-family';

import {
  BulkLoad,
  EmojiSource,
  FontDescriptor,
  HyphenationCallback,
  SingleLoad,
} from './types';

/**
 * Built-in CJK font family names.
 * These are registered automatically and fetched lazily from Google Fonts.
 *
 * @example
 * import { CJK } from '@react-pdf/font';
 * // or: import { CJK } from '@react-pdf/renderer';
 * <Text style={{ fontFamily: CJK.KOREAN }}>한국어</Text>
 */
export const CJK = {
  /** Simplified Chinese (Mainland China) */
  CHINESE_SIMPLIFIED: 'Noto Sans SC',
  /** Traditional Chinese (Taiwan, Macau) */
  CHINESE_TRADITIONAL: 'Noto Sans TC',
  /** Japanese (Hiragana, Katakana, Kanji) */
  JAPANESE: 'Noto Sans JP',
  /** Korean (Hangul, Hanja) */
  KOREAN: 'Noto Sans KR',
} as const;

/** @deprecated Use `CJK` instead */
export const CJK_FONT_FAMILIES = CJK;

/** All CJK font family names as an array */
export const CJK_FONT_NAMES: string[] = Object.values(CJK);

// Google Fonts CSS API base – resolved to static .ttf URLs at registration time.
// Using the CSS2 API with TTF format ensures stable, versioned font file URLs.
const CJK_FONT_SOURCES: Record<string, { normal: string; bold: string }> = {
  [CJK.CHINESE_SIMPLIFIED]: {
    normal:
      'https://fonts.gstatic.com/s/notosanssc/v40/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYw.ttf',
    bold: 'https://fonts.gstatic.com/s/notosanssc/v40/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGzjCnYw.ttf',
  },
  [CJK.CHINESE_TRADITIONAL]: {
    normal:
      'https://fonts.gstatic.com/s/notosanstc/v39/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz76Cy_Co.ttf',
    bold: 'https://fonts.gstatic.com/s/notosanstc/v39/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz70e1_Co.ttf',
  },
  [CJK.JAPANESE]: {
    normal:
      'https://fonts.gstatic.com/s/notosansjp/v56/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf',
    bold: 'https://fonts.gstatic.com/s/notosansjp/v56/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFPYk75s.ttf',
  },
  [CJK.KOREAN]: {
    normal:
      'https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLQ.ttf',
    bold: 'https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzg01eLQ.ttf',
  },
};

class FontStore {
  fontFamilies: Record<string, FontFamily> = {};

  emojiSource: EmojiSource | null = null;

  constructor() {
    this.register({
      family: 'Helvetica',
      fonts: [
        { src: 'Helvetica', fontStyle: 'normal', fontWeight: 400 },
        { src: 'Helvetica-Bold', fontStyle: 'normal', fontWeight: 700 },
        { src: 'Helvetica-Oblique', fontStyle: 'italic', fontWeight: 400 },
        { src: 'Helvetica-BoldOblique', fontStyle: 'italic', fontWeight: 700 },
      ],
    });

    this.register({
      family: 'Courier',
      fonts: [
        { src: 'Courier', fontStyle: 'normal', fontWeight: 400 },
        { src: 'Courier-Bold', fontStyle: 'normal', fontWeight: 700 },
        { src: 'Courier-Oblique', fontStyle: 'italic', fontWeight: 400 },
        { src: 'Courier-BoldOblique', fontStyle: 'italic', fontWeight: 700 },
      ],
    });

    this.register({
      family: 'Times-Roman',
      fonts: [
        { src: 'Times-Roman', fontStyle: 'normal', fontWeight: 400 },
        { src: 'Times-Bold', fontStyle: 'normal', fontWeight: 700 },
        { src: 'Times-Italic', fontStyle: 'italic', fontWeight: 400 },
        { src: 'Times-BoldItalic', fontStyle: 'italic', fontWeight: 700 },
      ],
    });

    // For backwards compatibility

    this.register({
      family: 'Helvetica-Bold',
      src: 'Helvetica-Bold',
    });

    this.register({
      family: 'Helvetica-Oblique',
      src: 'Helvetica-Oblique',
    });

    this.register({
      family: 'Helvetica-BoldOblique',
      src: 'Helvetica-BoldOblique',
    });

    this.register({
      family: 'Courier-Bold',
      src: 'Courier-Bold',
    });

    this.register({
      family: 'Courier-Oblique',
      src: 'Courier-Oblique',
    });

    this.register({
      family: 'Courier-BoldOblique',
      src: 'Courier-BoldOblique',
    });

    this.register({
      family: 'Times-Bold',
      src: 'Times-Bold',
    });

    this.register({
      family: 'Times-Italic',
      src: 'Times-Italic',
    });

    this.register({
      family: 'Times-BoldItalic',
      src: 'Times-BoldItalic',
    });

    // Register built-in CJK fonts (lazy-loaded from Google Fonts CDN)
    for (const [family, urls] of Object.entries(CJK_FONT_SOURCES)) {
      this.register({
        family,
        fonts: [
          { src: urls.normal, fontStyle: 'normal', fontWeight: 400 },
          { src: urls.bold, fontStyle: 'normal', fontWeight: 700 },
        ],
      });
    }

    // Load default fonts

    this.load({
      fontFamily: 'Helvetica',
      fontStyle: 'normal',
      fontWeight: 400,
    });

    this.load({
      fontFamily: 'Helvetica',
      fontStyle: 'normal',
      fontWeight: 700,
    });

    this.load({
      fontFamily: 'Helvetica',
      fontStyle: 'italic',
      fontWeight: 400,
    });

    this.load({
      fontFamily: 'Helvetica',
      fontStyle: 'italic',
      fontWeight: 700,
    });
  }

  hyphenationCallback: HyphenationCallback | null = null;

  register = (data: SingleLoad | BulkLoad) => {
    const { family } = data;

    if (!this.fontFamilies[family]) {
      this.fontFamilies[family] = FontFamily.create(family);
    }

    // Bulk loading
    if ('fonts' in data) {
      for (let i = 0; i < data.fonts.length; i += 1) {
        const { src, fontStyle, fontWeight, ...options } = data.fonts[i];
        this.fontFamilies[family].register({
          src,
          fontStyle,
          fontWeight,
          ...options,
        });
      }
    } else {
      const { src, fontStyle, fontWeight, ...options } = data;
      this.fontFamilies[family].register({
        src,
        fontStyle,
        fontWeight,
        ...options,
      });
    }
  };

  registerEmojiSource = (emojiSource: EmojiSource) => {
    this.emojiSource = emojiSource;
  };

  registerHyphenationCallback = (callback: HyphenationCallback) => {
    this.hyphenationCallback = callback;
  };

  getFont = (descriptor: FontDescriptor) => {
    const { fontFamily } = descriptor;

    if (!this.fontFamilies[fontFamily]) {
      throw new Error(
        `Font family not registered: ${fontFamily}. Please register it calling Font.register() method.`,
      );
    }

    return this.fontFamilies[fontFamily].resolve(descriptor);
  };

  load = async (descriptor: FontDescriptor) => {
    const font = this.getFont(descriptor);
    if (font) await font.load();
  };

  reset = () => {
    const keys = Object.keys(this.fontFamilies);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      for (let j = 0; j < this.fontFamilies[key].sources.length; j++) {
        const fontSource = this.fontFamilies[key].sources[j];
        fontSource.data = null;
      }
    }
  };

  clear = () => {
    this.fontFamilies = {};
    this.emojiSource = null;
    this.hyphenationCallback = null;
  };

  getRegisteredFonts = () => this.fontFamilies;

  getEmojiSource = (): EmojiSource | null => this.emojiSource;

  getHyphenationCallback = (): HyphenationCallback | null =>
    this.hyphenationCallback;

  getRegisteredFontFamilies = (): string[] => Object.keys(this.fontFamilies);
}

export type FontStoreType = FontStore;

export * from './types';

export default FontStore;
