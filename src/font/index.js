import font from './font';
import emoji from './emoji';
import standardFonts from './standard';
import hyphenation from './hyphenation';
import warning from '../utils/warning';

let fonts = {};

const register = (src, data) => {
  if (typeof src === 'object') {
    data = src;
  } else {
    warning(
      false,
      'Font.register will not longer accept the font source as first argument. Please move it into the data object. For more info refer to https://react-pdf.org/fonts',
    );

    data.src = src;
  }

  const { family } = data;

  if (!fonts[family]) {
    fonts[family] = font.create(family);
  }

  // Bulk loading
  if (data.fonts) {
    for (let i = 0; i < data.fonts.length; i++) {
      fonts[family].register({ family, ...data.fonts[i] });
    }
  } else {
    fonts[family].register(data);
  }
};

const getRegisteredFonts = () => fonts;

const getRegisteredFontFamilies = () => Object.keys(fonts);

const getFont = descriptor => {
  const { fontFamily } = descriptor;
  const isStandard = standardFonts.includes(fontFamily);

  if (isStandard) return null;

  if (!fonts[fontFamily]) {
    throw new Error(
      `Font family not registered: ${fontFamily}. Please register it calling Font.register() method.`,
    );
  }

  return fonts[fontFamily].resolve(descriptor);
};

const load = function({ fontFamily, ...descriptor }, doc, text = '') {
  const fontFamilies =
    typeof fontFamily === 'string'
      ? fontFamily.split(',').map(family => family.trim())
      : [...(fontFamily || [])];
  const promises = [];

  let remainingChars = [...text];

  for (let len = fontFamilies.length, i = 0; i < len; i++) {
    const family = fontFamilies[i];
    if (standardFonts.includes(family)) break;

    const font = getFont({ ...descriptor, fontFamily: family });

    const matches = remainingChars.join('').match(font.unicodeRange);
    remainingChars = remainingChars.filter(ch => !matches.includes(ch));

    // We cache the font to avoid fetching it many times
    if (matches.length) {
      if (!font.data && !font.loading) {
        promises.push(font.load());
      }
    }

    if (!remainingChars.length) {
      break;
    }
  }

  return Promise.all(promises);
};

const reset = function() {
  for (const font in fonts) {
    if (fonts.hasOwnProperty(font)) {
      fonts[font].data = null;
    }
  }
};

const clear = function() {
  fonts = {};
};

export default {
  register,
  getRegisteredFonts,
  getRegisteredFontFamilies,
  getFont,
  load,
  clear,
  reset,
  ...emoji,
  ...hyphenation,
};
