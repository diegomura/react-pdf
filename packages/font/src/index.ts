import font from './font';
import standard from './standard';
import {
  BulkLoad,
  EmojiSource,
  FontDescriptor,
  HyphenationCallback,
  SingleLoad,
} from './types';

class FontStore {
  fonts = {};

  emojiSource: EmojiSource | null = null;

  hyphenationCallback: HyphenationCallback | null = null;

  register = (data: SingleLoad | BulkLoad) => {
    const { family } = data;

    if (!this.fonts[family]) {
      this.fonts[family] = font.create(family);
    }

    // Bulk loading
    if ('fonts' in data) {
      for (let i = 0; i < data.fonts.length; i += 1) {
        this.fonts[family].register({ family, ...data.fonts[i] });
      }
    } else {
      this.fonts[family].register(data);
    }
  };

  registerEmojiSource = (emojiSource: EmojiSource) => {
    const url = 'url' in emojiSource ? emojiSource.url : undefined;
    const format = 'format' in emojiSource ? emojiSource.format : undefined;
    const builder = 'builder' in emojiSource ? emojiSource.builder : undefined;
    const withVariationSelectors = emojiSource.withVariationSelectors || false;

    this.emojiSource = {
      url,
      format: format || 'png',
      builder,
      withVariationSelectors,
    };
  };

  registerHyphenationCallback = (callback: HyphenationCallback) => {
    this.hyphenationCallback = callback;
  };

  getFont = (descriptor: FontDescriptor) => {
    const { fontFamily } = descriptor;
    const isStandard = standard.includes(fontFamily);

    if (isStandard) return null;

    if (!this.fonts[fontFamily]) {
      throw new Error(
        `Font family not registered: ${fontFamily}. Please register it calling Font.register() method.`,
      );
    }

    return this.fonts[fontFamily].resolve(descriptor);
  };

  load = async (descriptor: FontDescriptor) => {
    const { fontFamily } = descriptor;
    const fontFamilies =
      typeof fontFamily === 'string' ? [fontFamily] : [...(fontFamily || [])];

    const promises = [];

    for (let len = fontFamilies.length, i = 0; i < len; i += 1) {
      const family = fontFamilies[i];
      const isStandard = standard.includes(family);
      if (isStandard) return;

      const f = this.getFont({ ...descriptor, fontFamily: family });
      promises.push(f.load());
    }

    await Promise.all(promises);
  };

  reset = () => {
    const keys = Object.keys(this.fonts);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      this.fonts[key].data = null;
    }
  };

  clear = () => {
    this.fonts = {};
  };

  getRegisteredFonts = () => this.fonts;

  getEmojiSource = (): EmojiSource | null => this.emojiSource;

  getHyphenationCallback = (): HyphenationCallback | null =>
    this.hyphenationCallback;

  getRegisteredFontFamilies = (): string[] => Object.keys(this.fonts);
}

export {
  FontStyle,
  FontWeight,
  EmojiSource,
  FontDescriptor,
  HyphenationCallback,
} from './types';

export default FontStore;
