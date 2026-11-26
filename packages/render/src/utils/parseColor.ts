import colorString from 'color-string';

const black = { value: '#000', opacity: 1 };

const hslToRgb = (
  h: number,
  s: number,
  l: number,
): [number, number, number] => {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r: number, g: number, b: number;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
};

const hwbToRgb = (
  h: number,
  w: number,
  bl: number,
): [number, number, number] => {
  const wNorm = w / 100;
  const blNorm = bl / 100;

  if (wNorm + blNorm >= 1) {
    const gray = Math.round((wNorm / (wNorm + blNorm)) * 255);
    return [gray, gray, gray];
  }

  const [r, g, b] = hslToRgb(h, 100, 50);

  return [
    Math.round((r / 255) * (1 - wNorm - blNorm) * 255 + wNorm * 255),
    Math.round((g / 255) * (1 - wNorm - blNorm) * 255 + wNorm * 255),
    Math.round((b / 255) * (1 - wNorm - blNorm) * 255 + wNorm * 255),
  ];
};

// TODO: parse to number[] in layout to avoid this step
const parseColor = (hex?: string) => {
  if (!hex) return black;

  const parsed = colorString.get(hex);

  if (!parsed) return black;

  let r: number, g: number, b: number;

  if (parsed.model === 'hsl') {
    [r, g, b] = hslToRgb(parsed.value[0], parsed.value[1], parsed.value[2]);
  } else if (parsed.model === 'hwb') {
    [r, g, b] = hwbToRgb(parsed.value[0], parsed.value[1], parsed.value[2]);
  } else {
    [r, g, b] = parsed.value;
  }

  const value = colorString.to.hex(r, g, b);
  const opacity = parsed.value[3];
  if (!value) return black;

  return { value, opacity };
};

export default parseColor;
