import font from './font';

const CourierFont = font.create('Courier');
CourierFont.register({
  src: { builtin: 'Courier' },
});
CourierFont.register({
  fontStyle: 'oblique',
  src: { builtin: 'Courier-Oblique' },
});
CourierFont.register({
  fontWeight: 700,
  src: { builtin: 'Courier-Bold' },
});
CourierFont.register({
  fontWeight: 700,
  fontStyle: 'oblique',
  src: { builtin: 'Courier-BoldOblique' },
});

const HelveticaFont = font.create('Helvetica');
HelveticaFont.register({
  src: { builtin: 'Helvetica' },
});
HelveticaFont.register({
  fontStyle: 'oblique',
  src: { builtin: 'Helvetica-Oblique' },
});
HelveticaFont.register({
  fontWeight: 700,
  src: { builtin: 'Helvetica-Bold' },
});
HelveticaFont.register({
  fontWeight: 700,
  fontStyle: 'oblique',
  src: { builtin: 'Helvetica-BoldOblique' },
});

const TimesRomanFont = font.create('Times-Roman');
TimesRomanFont.register({
  src: { builtin: 'Times-Roman' },
});
TimesRomanFont.register({
  fontStyle: 'italic',
  src: { builtin: 'Times-Italic' },
});
TimesRomanFont.register({
  fontWeight: 700,
  src: { builtin: 'Times-Bold' },
});
TimesRomanFont.register({
  fontWeight: 700,
  fontStyle: 'italic',
  src: { builtin: 'Times-BoldItalic' },
});

export const builtinFonts = {
  Courier: CourierFont,
  Helvetica: HelveticaFont,
  'Times-Roman': TimesRomanFont,
};

function FontStore() {
  let fonts = { ...builtinFonts };

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
        fonts[family].register({ family, ...data.fonts[i] });
      }
    } else {
      fonts[family].register(data);
    }
  };

  this.registerEmojiSource = ({ url, format = 'png', builder }) => {
    emojiSource = { url, format, builder };
  };

  this.registerHyphenationCallback = callback => {
    hyphenationCallback = callback;
  };

  this.getFont = descriptor => {
    const { fontFamily } = descriptor;

    if (!fonts[fontFamily]) {
      throw new Error(
        `Font family not registered: ${fontFamily}. Please register it calling Font.register() method.`,
      );
    }

    return fonts[fontFamily].resolve(descriptor);
  };

  this.load = async descriptor => {
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
    fonts = { ...builtinFonts };
  };

  this.getRegisteredFonts = () => fonts;

  this.getEmojiSource = () => emojiSource;

  this.getHyphenationCallback = () => hyphenationCallback;

  this.getRegisteredFontFamilies = () => Object.keys(fonts);
}

export default FontStore;
