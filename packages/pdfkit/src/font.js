import * as fontkit from 'fontkit';
import createStandardFont from './font/standard';
import createEmbeddedFont from './font/embedded';

export class PDFFont {
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

  encode() {
    throw new Error('Must be implemented by subclasses');
  }

  widthOfString() {
    throw new Error('Must be implemented by subclasses');
  }

  ref() {
    return this.dictionary != null
      ? this.dictionary
      : (this.dictionary = this.document.ref());
  }

  finalize() {
    if (this.embedded || this.dictionary == null) {
      return;
    }

    this.embed();
    return (this.embedded = true);
  }

  embed() {
    throw new Error('Must be implemented by subclasses');
  }

  lineHeight(size, includeGap) {
    if (includeGap == null) {
      includeGap = false;
    }
    const gap = includeGap ? this.lineGap : 0;
    return ((this.ascender + gap - this.descender) / 1000) * size;
  }
}

export const StandardFont = createStandardFont(PDFFont);
export const EmbeddedFont = createEmbeddedFont(PDFFont);

export default PDFFont;
