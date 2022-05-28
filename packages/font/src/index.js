import font from './font';
import standard from './standard';

function FontStore() {
  let fonts = {};

  let emojiSource = null;

  let hyphenationCallback = null;

  this.register = data => {
    const { family } = data;

    if (!fonts[family]) {
      fonts[family] = font.create(family);
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

    let remainingChars = text;

    for (let len = fontFamilies.length, i = 0; i < len; i += 1) {
      const family = fontFamilies[i];

      const isStandard = standard.includes(family);
      if (isStandard) return;

      const f = this.getFont({ ...descriptor, fontFamily: family });

      const lengthBeforeReplace = remainingChars.length;
      remainingChars = remainingChars.replace(f.unicodeRange, '');

      const didReplace = lengthBeforeReplace !== remainingChars.length;

      if (didReplace) {
        if (!f.data && !f.loading) {
          promises.push(f.load());
        }
      }
      if (!remainingChars.length) {
        break;
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
