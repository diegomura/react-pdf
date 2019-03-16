import font from './font';
import emoji from './emoji';
import standardFonts from './standard';
import hyphenation from './hyphenation';

let fonts = {};

const register = (src, data) => {
  const { family } = data;

  if (!fonts[family]) {
    fonts[family] = font.create(family);
  }

  fonts[family].register({ src, ...data });
};

const getRegisteredFonts = () => Object.keys(fonts);

const getFont = descriptor => {
  const { fontFamily } = descriptor;
  const isStandard = standardFonts.includes(fontFamily);

  if (isStandard) return standardFonts[fontFamily];

  if (!fonts[fontFamily]) {
    throw new Error(
      `Font family not registered: ${fontFamily}. Please register it calling Font.register() method.`,
    );
  }

  return fonts[fontFamily].resolve(descriptor);
};

const load = async function(descriptor, doc) {
  const font = getFont(descriptor);

  // We cache the font to avoid fetching it many times
  if (!font.data && !font.loading) {
    await font.load();

    // If the font wasn't added to the document yet (aka. loaded), we add it.
    // This prevents calling `registerFont` many times for the same font.
    // Fonts loaded state will be reset after the document is closed.
    if (!font.loaded) {
      font.register(doc);
    }
  }
};

const reset = function() {
  for (const font in fonts) {
    if (fonts.hasOwnProperty(font)) {
      fonts[font].loaded = false;
    }
  }
};

const clear = function() {
  fonts = {};
};

export default {
  register,
  getRegisteredFonts,
  getFont,
  load,
  clear,
  reset,
  ...emoji,
  ...hyphenation,
};
