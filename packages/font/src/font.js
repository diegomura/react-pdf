/* eslint-disable max-classes-per-file */

import isUrl from 'is-url';
import fetch from 'cross-fetch';
import fontkit from '@react-pdf/fontkit';

const fetchFont = async (src, options) => {
  const response = await fetch(src, options);

  const buffer = await (response.buffer
    ? response.buffer()
    : response.arrayBuffer());

  return buffer.constructor.name === 'Buffer' ? buffer : Buffer.from(buffer);
};

class FontSource {
  constructor(src, fontFamily, fontStyle, fontWeight, options) {
    this.src = src;
    this.fontFamily = fontFamily;
    this.fontStyle = fontStyle || 'normal';
    this.fontWeight = 400;

    this.data = null;
    this.loading = false;
    this.options = options;
  }

  async load() {
    this.loading = true;

    if (BROWSER || isUrl(this.src)) {
      const { headers, body, method = 'GET' } = this.options;
      const data = await fetchFont(this.src, { method, body, headers });
      this.data = fontkit.create(data);
    } else {
      this.data = await new Promise((resolve, reject) =>
        fontkit.open(this.src, (err, data) =>
          err ? reject(err) : resolve(data),
        ),
      );
    }

    this.loading = false;
  }
}

class Font {
  static create(family) {
    return new Font(family);
  }

  constructor(family) {
    this.family = family;
    this.sources = [];
  }

  register({ src, fontWeight, fontStyle, ...options }) {
    this.sources.push(
      new FontSource(src, this.fontFamily, fontStyle, fontWeight, options),
    );
  }

  resolve(descriptor) {
    const { fontWeight = 400, fontStyle = 'normal' } = descriptor;
    const styleSources = this.sources.filter(s => s.fontStyle === fontStyle);

    // Weight resolution. https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Fallback_weights
    const exactFit = styleSources.find(s => s.fontWeight === fontWeight);

    if (exactFit) return exactFit;

    let res;

    if (fontWeight >= 400 && fontWeight <= 500) {
      const leftOffset = styleSources.filter(s => s.fontWeight <= fontWeight);
      const rightOffset = styleSources.filter(s => s.fontWeight > 500);
      const fit = styleSources.filter(
        s => s.fontWeight >= fontWeight && s.fontWeight < 500,
      );

      res = fit[0] || leftOffset[leftOffset.length - 1] || rightOffset[0];
    }

    const lt = styleSources.filter(s => s.fontWeight < fontWeight);
    const gt = styleSources.filter(s => s.fontWeight > fontWeight);

    if (fontWeight < 400) {
      res = lt[lt.length - 1] || gt[0];
    }

    if (fontWeight > 500) {
      res = gt[0] || lt[lt.length - 1];
    }

    if (!res) {
      throw new Error(
        `Could not resolve font for ${this.fontFamily}, fontWeight ${fontWeight}`,
      );
    }

    return res;
  }
}

export default Font;
