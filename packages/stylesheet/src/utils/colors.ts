import hlsToHex from 'hsl-to-hex';
import colorString from 'color-string';

const isRgb = (value: string) => /^rgba?\(/i.test(value);
const isHsl = (value: string) => /^hsla?\(/i.test(value);

/**
 * Transform rgb color to hexa
 *
 * @param value - Styles value
 * @returns Transformed value
 */
const parseRgb = (value: string) => {
  const rgb = colorString.get.rgb(value);
  if (!rgb) return value;
  return colorString.to.hex(rgb);
};

/**
 * Transform Hsl color to hexa
 *
 * @param value - Styles value
 * @returns Transformed value
 */
const parseHsl = (value: string) => {
  const hsl = colorString.get.hsl(value);
  if (!hsl) return value;

  const [h, s, l, a] = hsl;
  const hex = hlsToHex(Math.round(h), Math.round(s), Math.round(l));

  // Append alpha channel if not fully opaque
  if (a !== undefined && a < 1) {
    const alphaHex = Math.round(a * 255)
      .toString(16)
      .toUpperCase()
      .padStart(2, '0');
    return hex.toUpperCase() + alphaHex;
  }

  return hex.toUpperCase();
};

/**
 * Transform given color to hexa
 *
 * @param value - Styles value
 * @returns Transformed value
 */
const transformColor = (value: string): string => {
  if (isRgb(value)) return parseRgb(value);
  if (isHsl(value)) return parseHsl(value);

  return value;
};

export default transformColor;
