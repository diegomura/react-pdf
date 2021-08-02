import * as R from 'ramda';
import hlsToHex from 'hsl-to-hex';
import colorString from 'color-string';

const isRgb = R.test(/rgb/g);
const isRgba = R.test(/rgba/g);
const isHsl = R.test(/hsl/g);
const isHsla = R.test(/hsla/g);

/**
 * Transform rgb color to hexa
 *
 * @param {String} styles value
 * @returns {Object} transformed value
 */
const parseRgb = R.compose(colorString.to.hex, colorString.get.rgb);

/**
 * Transform Hsl color to hexa
 *
 * @param {String} styles value
 * @returns {Object} transformed value
 */
const parseHsl = R.compose(
  R.toUpper,
  R.apply(hlsToHex),
  R.map(Math.round),
  colorString.get.hsl,
);

/**
 * Transform given color to hexa
 *
 * @param {String} styles value
 * @returns {Object} transformed value
 */
const transformColor = value =>
  R.cond([
    [isRgba, parseRgb],
    [isRgb, parseRgb],
    [isHsla, parseHsl],
    [isHsl, parseHsl],
    [R.T, R.always(value)],
  ])(value);

export default transformColor;
