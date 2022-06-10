import Font from './font';
import standard from './standard';

function FontStore() {
  let fonts = {};

  let emojiSource = null;

  let hyphenationCallback = null;

  this.register = data => {
    const { family } = data;

    if (!fonts[family]) {
      fonts[family] = Font.create(family);
    }
    // Bulk loading
    if (data.fonts) {
      for (let i = 0; i < data.fonts.length; i += 1) {
        const defaultValues = { ...data };
        delete defaultValues.fonts;

        fonts[family].register({ ...defaultValues, ...data.fonts[i] });
      }
    } else {
      fonts[family].register(data);
    }
  };

  this.registerEmojiSource = ({ url, format = 'png' }) => {
    emojiSource = { url, format };
  };

  this.registerHyphenationCallback = callback => {
    hyphenationCallback = callback;
  };

  this.getFont = descriptor => {
    const { fontFamily } = descriptor;
    const isStandard = standard.includes(fontFamily);

    if (isStandard) return null;

    if (!fonts[fontFamily]) {
      throw new Error(
        `Font family not registered: ${fontFamily}. Please register it calling Font.register() method.`,
      );
    }

    return fonts[fontFamily].resolve(descriptor);
  };

  this.load = async (descriptor, text = '') => {
    const { fontFamily } = descriptor;
    const fontFamilies =
      typeof fontFamily === 'string'
        ? fontFamily.split(',').map(family => family.trim())
        : [...(fontFamily || [])];

    const promises = [];

    for (let len = fontFamilies.length, i = 0; i < len; i += 1) {
      const family = fontFamilies[i];

      const isStandard = standard.includes(family);
      if (isStandard) return;

      const font = this.getFont({ ...descriptor, fontFamily: family });

      const didMatch = !font.unicodeRange || font.unicodeRange.test(text);

      if (didMatch) {
        promises.push(font.load());
      }
    }

    await Promise.all(promises);
  };

  this.reset = () => {
    const keys = Object.keys(fonts);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      fonts[key].data = null;
    }
  };

  this.clear = () => {
    fonts = {};
  };

  this.getRegisteredFonts = () => fonts;

  this.getEmojiSource = () => emojiSource;

  this.getHyphenationCallback = () => hyphenationCallback;

  this.getRegisteredFontFamilies = () => Object.keys(fonts);
}

export default FontStore;
