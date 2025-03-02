import isUrl from 'is-url';
import * as fontkit from 'fontkit';

import { Font, FontSourceOptions, FontStyle, RemoteOptions } from './types';
import StandardFont, { STANDARD_FONTS } from './standard-font';

const fetchFont = async (src: string, options: RemoteOptions) => {
  const response = await fetch(src, options);
  const data = await response.arrayBuffer();

  return new Uint8Array(data);
};

const isDataUrl = (dataUrl: string) => {
  const header = dataUrl.split(',')[0];
  const hasDataPrefix = header.substring(0, 5) === 'data:';
  const hasBase64Prefix = header.split(';')[1] === 'base64';

  return hasDataPrefix && hasBase64Prefix;
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
