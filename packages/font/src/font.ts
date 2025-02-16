/* eslint-disable max-classes-per-file */

import isUrl from 'is-url';
import * as fontkit from 'fontkit';
import {
  FontDescriptor,
  FontSourceOptions,
  FontStyle,
  FontWeight,
} from './types';

const FONT_WEIGHTS = {
  thin: 100,
  hairline: 100,
  ultralight: 200,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  ultrabold: 800,
  extrabold: 800,
  heavy: 900,
  black: 900,
};

const fetchFont = async (src: string, options) => {
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

const resolveFontWeight = (value: FontWeight) => {
  return typeof value === 'string' ? FONT_WEIGHTS[value] : value;
};

const sortByFontWeight = (a: FontSource, b: FontSource) =>
  a.fontWeight - b.fontWeight;

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
    fontStyle: FontStyle,
    fontWeight: number,
    options: FontSourceOptions,
  ) {
    this.src = src;
    this.fontFamily = fontFamily;
    this.fontStyle = fontStyle || 'normal';
    this.fontWeight = fontWeight || 400;

    this.data = null;
    this.options = options;
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

class Font {
  family: string;
  sources: FontSource[];

  static create(family: string) {
    return new Font(family);
  }

  constructor(family: string) {
    this.family = family;
    this.sources = [];
  }

  register({ src, fontWeight, fontStyle, ...options }) {
    const numericFontWeight = resolveFontWeight(fontWeight);

    this.sources.push(
      new FontSource(src, this.family, fontStyle, numericFontWeight, options),
    );
  }

  resolve(descriptor: FontDescriptor) {
    const { fontWeight = 400, fontStyle = 'normal' } = descriptor;
    const styleSources = this.sources.filter((s) => s.fontStyle === fontStyle);

    const exactFit = styleSources.find((s) => s.fontWeight === fontWeight);

    if (exactFit) return exactFit;

    // Weight resolution. https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Fallback_weights

    let res: FontSource;

    const numericFontWeight = resolveFontWeight(fontWeight);

    if (numericFontWeight >= 400 && numericFontWeight <= 500) {
      const leftOffset = styleSources.filter(
        (s) => s.fontWeight <= numericFontWeight,
      );

      const rightOffset = styleSources.filter((s) => s.fontWeight > 500);

      const fit = styleSources.filter(
        (s) => s.fontWeight >= numericFontWeight && s.fontWeight < 500,
      );

      res = fit[0] || leftOffset[leftOffset.length - 1] || rightOffset[0];
    }

    const lt = styleSources
      .filter((s) => s.fontWeight < numericFontWeight)
      .sort(sortByFontWeight);
    const gt = styleSources
      .filter((s) => s.fontWeight > numericFontWeight)
      .sort(sortByFontWeight);

    if (numericFontWeight < 400) {
      res = lt[lt.length - 1] || gt[0];
    }

    if (numericFontWeight > 500) {
      res = gt[0] || lt[lt.length - 1];
    }

    if (!res) {
      throw new Error(
        `Could not resolve font for ${this.family}, fontWeight ${fontWeight}, fontStyle ${fontStyle}`,
      );
    }

    return res;
  }
}

export default Font;
