import isUrl from 'is-url';
import fetch from 'cross-fetch';
import fontkit from '@react-pdf/fontkit';

import standardFonts from './standard';

let fonts = {};
let emojiSource;
let hyphenationCallback;

const fetchFont = async (src, options) => {
  const response = await fetch(src, options);

  const buffer = await (response.buffer
    ? response.buffer()
    : response.arrayBuffer());

  return buffer.constructor.name === 'Buffer' ? buffer : Buffer.from(buffer);
};

const register = (src, { family, ...otherOptions }) => {
  fonts[family] = {
    src,
    loaded: false,
    loading: false,
    data: null,
    ...otherOptions,
  };
};

const registerHyphenationCallback = callback => {
  hyphenationCallback = callback;
};

const registerEmojiSource = ({ url, format = 'png' }) => {
  emojiSource = { url, format };
};

const getRegisteredFonts = () => Object.keys(fonts);

const getFont = family => fonts[family];

const getEmojiSource = () => emojiSource;

const getHyphenationCallback = () => hyphenationCallback;

const load = async function(fontFamily, doc) {
  const font = getFont(fontFamily);

  // We cache the font to avoid fetching it many times
  if (font && !font.data && !font.loading) {
    font.loading = true;

    if (isUrl(font.src)) {
      const { src, headers, body, method = 'GET' } = font;
      const data = await fetchFont(src, { headers, method, body });
      font.data = fontkit.create(data);
    } else {
      if (BROWSER) {
        throw new Error(
          `Invalid font url: ${
            font.src
          }. If you use relative url please replace it with absolute one (ex. /font.ttf -> http://localhost:3000/font.ttf)`,
        );
      }

      font.data = await new Promise((resolve, reject) =>
        fontkit.open(font.src, (err, data) =>
          err ? reject(err) : resolve(data),
        ),
      );
    }
  }

  // If the font wasn't added to the document yet (aka. loaded), we add it.
  // This prevents calling `registerFont` many times for the same font.
  // Fonts loaded state will be reset after the document is closed.
  if (font && !font.loaded) {
    font.loaded = true;
    font.loading = false;
    doc.registerFont(fontFamily, font.data);
  }

  if (!font && !standardFonts.includes(fontFamily)) {
    throw new Error(
      `Font family not registered: ${fontFamily}. Please register it calling Font.register() method.`,
    );
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
  getEmojiSource,
  getRegisteredFonts,
  registerEmojiSource,
  registerHyphenationCallback,
  getHyphenationCallback,
  getFont,
  load,
  clear,
  reset,
};
