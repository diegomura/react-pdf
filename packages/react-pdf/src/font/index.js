import isUrl from 'is-url';
import standardFonts from './standard';
import { fetchFont } from '../utils/font';

let fonts = {};

const register = (src, { family, ...otherOptions }) => {
  fonts[family] = {
    src,
    loaded: false,
    ...otherOptions,
  };
};

const getRegisteredFonts = () => Object.keys(fonts);

const load = async (fontFamily, doc) => {
  const font = fonts[fontFamily];

  if (font && !font.loaded) {
    font.loaded = true;

    const src = isUrl(font.src) ? await fetchFont(font.src) : font.src;

    doc.registerFont(fontFamily, src);
  }

  if (!font && !standardFonts.includes(fontFamily)) {
    throw new Error(
      `Font familiy not registered: ${fontFamily}. Please register it calling Font.register() method.`,
    );
  }
};

const clear = () => {
  fonts = {};
};

export default {
  register,
  getRegisteredFonts,
  load,
  clear,
};
