import * as fontkit from 'fontkit';
import StandardFont from './font/standard';
import EmbeddedFont from './font/embedded';
import { getStandardFont, isStandardFont } from './font/standard_fonts';

class PDFFontFactory {
  static open(document, src, family, id) {
    let font;
    if (typeof src === 'string') {
      if (isStandardFont(src)) {
        return new StandardFont(document, getStandardFont(src), id);
      }

      if (BROWSER) {
        throw new Error(`Can't open ${src} in browser build`);
      }

      font = fontkit.openSync(src, family);
    } else if (src instanceof Uint8Array) {
      font = fontkit.create(src, family);
    } else if (src instanceof ArrayBuffer) {
      font = fontkit.create(new Uint8Array(src), family);
    } else if (typeof src === 'object') {
      font = src;
    }

    if (font == null) {
      throw new Error('Not a supported font format or standard PDF font.');
    }

    return new EmbeddedFont(document, font, id);
  }
}

export default PDFFontFactory;
