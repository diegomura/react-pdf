import hexToRGB from 'hex-rgb';
import colorNames from 'color-name';

const isHex = color => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);

export const toRGB = color => {
  if (isHex(color)) {
    return hexToRGB(color).join(' ');
  } else if (colorNames[color]) {
    return colorNames[color].join(' ');
  }

  throw new Error(`Unknown color: ${color}`);
};

export default {
  toRGB,
};
