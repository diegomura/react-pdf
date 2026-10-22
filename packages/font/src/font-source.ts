import isUrl from 'is-url';
import * as fontkit from 'fontkit';

import { Font, FontSourceOptions, FontStyle, RemoteOptions } from './types';
import StandardFont, { STANDARD_FONTS } from './standard-font';

const fetchFont = async (src: string, options: RemoteOptions) => {
  const response = await fetch(src, options);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch font from ${src}: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.arrayBuffer();

  return new Uint8Array(data);
};

const isDataUrl = (dataUrl: string) => {
  const commaIndex = dataUrl.indexOf(',');
  if (commaIndex === -1) return false;

  const header = dataUrl.substring(0, commaIndex);
  const hasDataPrefix = header.startsWith('data:');
  const hasBase64Prefix = header.includes(';base64');

  return hasDataPrefix && hasBase64Prefix;
};

/**
 * fontkit caches glyphs by id together with the code points of their first
 * lookup. Lookups by id alone, like the ones made for the components of
 * composite glyphs when a PDF font subset is embedded, leave those glyphs with
 * empty code points for every later layout of the same font instance. textkit
 * maps glyphs back to the string through their code points, so text rendered
 * in later documents would lose glyphs. Restore them on the next lookup that
 * knows them.
 *
 * @param font - fontkit font
 */
const keepGlyphCodePoints = (font: fontkit.Font) => {
  const getGlyph = font.getGlyph.bind(font);

  font.getGlyph = (id: number, codePoints: number[] = []) => {
    const glyph = getGlyph(id, codePoints);

    if (glyph && glyph.codePoints.length === 0 && codePoints.length > 0) {
      glyph.codePoints = codePoints;
    }

    return glyph;
  };
};

class FontSource {
  src: string;
  fontFamily: string;
  fontStyle: FontStyle;
  fontWeight: number;
  data: Font | null;
  options: FontSourceOptions;
  loadResultPromise: Promise<void> | null;

  constructor(
    src: string,
    fontFamily: string,
    fontStyle?: FontStyle,
    fontWeight?: number,
    options?: FontSourceOptions,
  ) {
    this.src = src;
    this.fontFamily = fontFamily;
    this.fontStyle = fontStyle || 'normal';
    this.fontWeight = fontWeight || 400;

    this.data = null;
    this.options = options || {};
    this.loadResultPromise = null;
  }

  async _load(): Promise<void> {
    const { postscriptName } = this.options;

    let data = null;

    if (STANDARD_FONTS.includes(this.src)) {
      data = new StandardFont(this.src);
    } else if (isDataUrl(this.src)) {
      const raw = this.src.split(',')[1];
      const uint8Array = new Uint8Array(
        atob(raw)
          .split('')
          .map((c) => c.charCodeAt(0)),
      );
      data = fontkit.create(uint8Array, postscriptName);
    } else if (BROWSER || isUrl(this.src)) {
      const { headers, body, method = 'GET' } = this.options;
      const buffer = await fetchFont(this.src, { method, body, headers });
      data = fontkit.create(buffer, postscriptName);
    } else if (!BROWSER) {
      data = await fontkit.open(this.src, postscriptName);
    }

    if (data && 'fonts' in data) {
      throw new Error('Font collection is not supported');
    }

    if (data && !(data instanceof StandardFont)) keepGlyphCodePoints(data);

    this.data = data;
  }

  async load() {
    if (this.loadResultPromise === null) {
      this.loadResultPromise = this._load();
    }
    return this.loadResultPromise;
  }
}

export default FontSource;
