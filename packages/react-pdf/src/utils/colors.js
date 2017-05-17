import hexToRGB from 'hex-rgb';
import colorNames from 'color-name';

const isHex = color => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
const discretize = color => color.map(channel => channel / 255);

export const toRGB = color => {
  if (isHex(color)) {
    return discretize(hexToRGB(color)).join(' ');
  } else if (colorNames[color]) {
    return discretize(colorNames[color]).join(' ');
  }

  throw new Error(`Unknown color: ${color}`);
};

export default {
  toRGB,
};
