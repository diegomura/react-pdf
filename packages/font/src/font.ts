import FontSource from './font-source';
import { FontDescriptor, FontWeight, SingleLoad } from './types';

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

const resolveFontWeight = (value: FontWeight) => {
  return typeof value === 'string' ? FONT_WEIGHTS[value] : value;
};

const sortByFontWeight = (a: FontSource, b: FontSource) =>
  a.fontWeight - b.fontWeight;

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

  register({
    src,
    fontWeight,
    fontStyle,
    ...options
  }: Omit<SingleLoad, 'family'>) {
    const numericFontWeight = fontWeight
      ? resolveFontWeight(fontWeight)
      : undefined;

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

    let font: FontSource | null = null;

    const numericFontWeight = resolveFontWeight(fontWeight);

    if (numericFontWeight >= 400 && numericFontWeight <= 500) {
      const leftOffset = styleSources.filter(
        (s) => s.fontWeight <= numericFontWeight,
      );

      const rightOffset = styleSources.filter((s) => s.fontWeight > 500);

      const fit = styleSources.filter(
        (s) => s.fontWeight >= numericFontWeight && s.fontWeight < 500,
      );

      font = fit[0] || leftOffset[leftOffset.length - 1] || rightOffset[0];
    }

    const lt = styleSources
      .filter((s) => s.fontWeight < numericFontWeight)
      .sort(sortByFontWeight);

    const gt = styleSources
      .filter((s) => s.fontWeight > numericFontWeight)
      .sort(sortByFontWeight);

    if (numericFontWeight < 400) {
      font = lt[lt.length - 1] || gt[0];
    }

    if (numericFontWeight > 500) {
      font = gt[0] || lt[lt.length - 1];
    }

    if (!font) {
      throw new Error(
        `Could not resolve font for ${this.family}, fontWeight ${fontWeight}, fontStyle ${fontStyle}`,
      );
    }

    return font;
  }
}

export default Font;
