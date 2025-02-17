import hlsToHex from 'hsl-to-hex';
import colorString from 'color-string';

const isRgb = (value: string) => /rgba?/g.test(value);
const isHsl = (value: string) => /hsla?/g.test(value);

/**
 * Transform rgb color to hexa
 *
 * @param value - Styles value
 * @returns Transformed value
 */
const parseRgb = (value: string) => {
  const rgb = colorString.get.rgb(value);
  return colorString.to.hex(rgb);
};

/**
 * Transform Hsl color to hexa
 *
 * @param value - Styles value
 * @returns Transformed value
 */
const parseHsl = (value: string) => {
  const hsl = colorString.get.hsl(value).map(Math.round);
  const hex = hlsToHex(...hsl);

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
