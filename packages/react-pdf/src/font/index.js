import isUrl from 'is-url';
import standardFonts from './standard';
import { fetchFont } from '../utils/font';

let fonts = {};

const register = (src, { family, ...otherOptions }) => {
  fonts[family] = {
    src,
    loaded: false,
    data: null,
    ...otherOptions,
  };
};

const getRegisteredFonts = () => Object.keys(fonts);

const load = async (fontFamily, doc) => {
  const font = fonts[fontFamily];

  // We cache the font to avoid fetching it many time
  if (font && !font.data) {
    font.data = isUrl(font.src) ? await fetchFont(font.src) : font.src;
  }

  // If the font wasn't added to the document yet (aka. loaded), we do.
  // This prevents calling `registerFont` many times for the same font.
  // Fonts loaded state will be resetted after document is closed.
  if (font && !font.loaded) {
    font.loaded = true;
    doc.registerFont(fontFamily, font.data);
  }

  if (!font && !standardFonts.includes(fontFamily)) {
    throw new Error(
      `Font familiy not registered: ${fontFamily}. Please register it calling Font.register() method.`,
    );
  }
};

const reset = () => {
  for (const font in fonts) {
    if (fonts.hasOwnProperty(font)) {
      fonts[font].loaded = false;
    }
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
  reset,
};
