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

const load = async function(descriptor) {
  const { fontFamily } = descriptor;
  const isStandard = standardFonts.includes(fontFamily);

  if (isStandard) return;

  const font = getFont(descriptor);

  // We cache the font to avoid fetching it many times
  if (!font.data && !font.loading) {
    await font.load();
  }
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
