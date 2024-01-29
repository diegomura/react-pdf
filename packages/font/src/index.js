import font from './font';
import standard from './standard';

function FontStore() {
  let fonts = {};

  let emojiSource = null;

  let hyphenationCallback = null;

  this.register = (data) => {
    const { family } = data;

    if (!fonts[family]) {
      fonts[family] = font.create(family);
    }

    // Bulk loading
    if (data.fonts) {
      for (let i = 0; i < data.fonts.length; i += 1) {
        fonts[family].register({ family, ...data.fonts[i] });
      }
    } else {
      fonts[family].register(data);
    }
  };

  this.registerEmojiSource = ({
    url,
    format = 'png',
    builder,
    withVariationSelectors = false,
  }) => {
    emojiSource = { url, format, builder, withVariationSelectors };
  };

  this.registerHyphenationCallback = (callback) => {
    hyphenationCallback = callback;
  };

  this.getFont = (descriptor) => {
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

  this.load = async (descriptor) => {
    const { fontFamily } = descriptor;
    const isStandard = standard.includes(fontFamily);

    if (isStandard) return;

    const f = this.getFont(descriptor);

    // We cache the font to avoid fetching it many times
    await f.load();
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
