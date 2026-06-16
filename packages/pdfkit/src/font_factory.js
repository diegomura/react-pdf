import * as fontkit from 'fontkit';
import PDFFont from './font';
import createStandardFont from './font/standard';
import createEmbeddedFont from './font/embedded';

const StandardFont = createStandardFont(PDFFont);
const EmbeddedFont = createEmbeddedFont(PDFFont);

class PDFFontFactory {
  static open(document, src, family, id) {
    let font;

    if (typeof src === 'string') {
      if (StandardFont.isStandardFont(src)) {
        return new StandardFont(document, src, id);
      }

      if (!BROWSER) {
        font = fontkit.openSync(src, family);
      } else {
        throw new Error(`Can't open ${src} in browser build`);
      }
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
