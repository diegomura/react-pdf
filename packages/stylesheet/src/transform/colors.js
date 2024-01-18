import hlsToHex from 'hsl-to-hex';
import colorString from 'color-string';

const isRgb = value => /rgba?/g.test(value);
const isHsl = value => /hsla?/g.test(value);

/**
 * Transform rgb color to hexa
 *
 * @param {string} value styles value
 * @returns {Object} transformed value
 */
const parseRgb = value => {
  const rgb = colorString.get.rgb(value);
  return colorString.to.hex(rgb);
};

/**
 * Transform Hsl color to hexa
 *
 * @param {string} value styles value
 * @returns {Object} transformed value
 */
const parseHsl = value => {
  const hsl = colorString.get.hsl(value).map(Math.round);
  const hex = hlsToHex(...hsl);

  return hex.toUpperCase();
};

/**
 * Transform given color to hexa
 *
 * @param {string} value styles value
 * @returns {Object} transformed value
 */
const transformColor = value => {
  if (isRgb(value)) return parseRgb(value);
  if (isHsl(value)) return parseHsl(value);

  return value;
};

export default transformColor;
