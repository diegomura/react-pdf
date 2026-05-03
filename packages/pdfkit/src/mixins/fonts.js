import PDFFontFactory from '../font_factory';
import { CM_TO_IN, IN_TO_PT, MM_TO_CM, PC_TO_PT, PX_TO_IN } from '../utils';

const isEqualFont = (font1, font2) => {
  // compare font checksum
  if (
    font1.font._tables?.head?.checkSumAdjustment !==
    font2.font._tables?.head?.checkSumAdjustment
  ) {
    return false;
  }

  // compare font name table
  if (
    JSON.stringify(font1.font._tables?.name?.records) !==
    JSON.stringify(font2.font._tables?.name?.records)
  ) {
    return false;
  }

  return true;
};

export default {
  initFonts(
    defaultFont = 'Helvetica',
    defaultFontFamily = null,
    defaultFontSize = 12,
  ) {
    // Lookup table for embedded fonts
    this._fontFamilies = {};
    this._fontCount = 0;

    // Font state
    // Useful to export the font builder so that someone can create a snapshot of the current state
    // (e.g. Reverting back to the previous font)
    this._fontSource = defaultFont;
    this._fontFamily = defaultFontFamily;
    this._fontSize = defaultFontSize;
    this._font = null;

    // rem size is fixed per document as the document is the root element
    this._remSize = defaultFontSize;

    this._registeredFonts = {};

    // Set the default font
    if (defaultFont) {
      this.font(defaultFont, defaultFontFamily);
    }
  },

  font(src, family, size) {
    let cacheKey, font;
    if (typeof family === 'number') {
      size = family;
      family = null;
    }

    // check registered fonts if src is a string
    if (typeof src === 'string' && this._registeredFonts[src]) {
      cacheKey = src;
      ({ src, family } = this._registeredFonts[src]);
    } else {
      cacheKey = family || src;
      if (typeof cacheKey !== 'string') {
        cacheKey = null;
      }
    }

    this._fontSource = src;
    this._fontFamily = family;
    if (size != null) {
      this.fontSize(size);
    }

    // fast path: check if the font is already in the PDF
    if ((font = this._fontFamilies[cacheKey])) {
      this._font = font;
      return this;
    }

    // load the font
    const id = `F${++this._fontCount}`;
    this._font = PDFFontFactory.open(this, src, family, id);

    // check for existing font familes with the same name already in the PDF
    // useful if the font was passed as a buffer
    if (
      (font = this._fontFamilies[this._font.name]) &&
      isEqualFont(this._font, font)
    ) {
      this._font = font;
      return this;
    }

    // save the font for reuse later
    if (cacheKey) {
      this._fontFamilies[cacheKey] = this._font;
    }

    if (this._font.name && !this._fontFamilies[this._font.name]) {
      this._fontFamilies[this._font.name] = this._font;
    }

    // if the font wasn't registered under any key (e.g. loaded via raw buffer
    // with no cacheKey and a postscript name that collides with an
    // already-registered font), register it under its id so it always gets
    // finalized and doesn't leave a dangling references
    if (
      !cacheKey &&
      (!this._font.name || this._fontFamilies[this._font.name] !== this._font)
    ) {
      this._fontFamilies[this._font.id] = this._font;
    }

    return this;
  },

  fontSize(_fontSize) {
    this._fontSize = this.sizeToPoint(_fontSize);
    return this;
  },

  currentLineHeight(includeGap) {
    return this._font.lineHeight(this._fontSize, includeGap);
  },

  registerFont(name, src, family) {
    this._registeredFonts[name] = {
      src,
      family,
    };

    return this;
  },

  /**
   * Convert a {@link Size} into a point measurement
   *
   * @param {Size | boolean | undefined} size - The size to convert
   * @param {Size | boolean | undefined} defaultValue - The default value when undefined
   * @param {PDFPage} page - The page used for computing font sizes
   * @param {number} [percentageWidth] - The value to use for computing size based on `%`
   *
   * @returns number
   */
  sizeToPoint(
    size,
    defaultValue = 0,
    page = this.page,
    percentageWidth = undefined,
  ) {
    if (!percentageWidth) percentageWidth = this._fontSize;
    if (typeof defaultValue !== 'number')
      defaultValue = this.sizeToPoint(defaultValue);
    if (size === undefined) return defaultValue;
    if (typeof size === 'number') return size;
    if (typeof size === 'boolean') return Number(size);

    const match = String(size).match(
      /((\d+)?(\.\d+)?)(em|in|px|cm|mm|pc|ex|ch|rem|vw|vh|vmin|vmax|%|pt)?/,
    );
    if (!match) throw new Error(`Unsupported size '${size}'`);
    let multiplier;
    switch (match[4]) {
      case 'em':
        multiplier = this._fontSize;
        break;
      case 'in':
        multiplier = IN_TO_PT;
        break;
      case 'px':
        multiplier = PX_TO_IN * IN_TO_PT;
        break;
      case 'cm':
        multiplier = CM_TO_IN * IN_TO_PT;
        break;
      case 'mm':
        multiplier = MM_TO_CM * CM_TO_IN * IN_TO_PT;
        break;
      case 'pc':
        multiplier = PC_TO_PT;
        break;
      case 'ex':
        multiplier = this.currentLineHeight();
        break;
      case 'ch':
        multiplier = this.widthOfString('0');
        break;
      case 'rem':
        multiplier = this._remSize;
        break;
      case 'vw':
        multiplier = page.width / 100;
        break;
      case 'vh':
        multiplier = page.height / 100;
        break;
      case 'vmin':
        multiplier = Math.min(page.width, page.height) / 100;
        break;
      case 'vmax':
        multiplier = Math.max(page.width, page.height) / 100;
        break;
      case '%':
        multiplier = percentageWidth / 100;
        break;
      case 'pt':
      default:
        multiplier = 1;
    }

    return multiplier * Number(match[1]);
  },
};
