import isUrl from 'is-url';
import * as fontkit from 'fontkit';
import { FontSourceOptions, FontStyle, RemoteOptions } from './types';

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
  data: fontkit.Font | fontkit.FontCollection | null;
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

    if (isDataUrl(this.src)) {
      const raw = this.src.split(',')[1];
      const uint8Array = new Uint8Array(
        atob(raw)
          .split('')
          .map((c) => c.charCodeAt(0)),
      );
      this.data = fontkit.create(uint8Array, postscriptName);
    } else if (BROWSER || isUrl(this.src)) {
      const { headers, body, method = 'GET' } = this.options;
      const data = await fetchFont(this.src, { method, body, headers });
      this.data = fontkit.create(data, postscriptName);
    } else if (!BROWSER) {
      this.data = await fontkit.open(this.src, postscriptName);
    }
  }

  async load() {
    if (this.loadResultPromise === null) {
      this.loadResultPromise = this._load();
    }
    return this.loadResultPromise;
  }
}

export default FontSource;
