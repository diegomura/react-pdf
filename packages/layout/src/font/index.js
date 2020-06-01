/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */

import font from './font';
import emoji from './emoji';
import standardFonts from './standard';
import hyphenation from './hyphenation';

let fonts = {};

const register = data => {
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

const load = async descriptor => {
  const { fontFamily } = descriptor;
  const isStandard = standardFonts.includes(fontFamily);

  if (isStandard) return;

  const f = getFont(descriptor);

  // We cache the font to avoid fetching it many times
  if (!f.data && !f.loading) {
    await f.load();
  }
};

const reset = () => {
  for (const f in fonts) {
    if (fonts.hasOwnProperty(f)) {
      fonts[f].data = null;
    }
  }
};

const clear = () => {
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
