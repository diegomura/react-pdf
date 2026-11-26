/**
 * Parse a hex color string (#RGB, #RRGGBB) into [r, g, b] components.
 */
function parseHex(hex: string): [number, number, number] {
  const h = hex.replace('#', '');

  if (h.length === 3) {
    return [
      parseInt(h[0] + h[0], 16),
      parseInt(h[1] + h[1], 16),
      parseInt(h[2] + h[2], 16),
    ];
  }

  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

/**
 * Convert [r, g, b] components to a hex color string.
 */
function toHex(r: number, g: number, b: number): string {
  const rr = Math.round(r).toString(16).padStart(2, '0');
  const gg = Math.round(g).toString(16).padStart(2, '0');
  const bb = Math.round(b).toString(16).padStart(2, '0');
  return `#${rr}${gg}${bb}`;
}

/**
 * Mix two hex colors in sRGB space, matching the CSS `color-mix(in srgb, ...)` function.
 *
 * @param color1 - First hex color
 * @param percent1 - Percentage of first color (0-100)
 * @param color2 - Second hex color
 * @returns Mixed hex color
 */
export function colorMix(
  color1: string,
  percent1: number,
  color2: string,
): string {
  const [r1, g1, b1] = parseHex(color1);
  const [r2, g2, b2] = parseHex(color2);
  const p = percent1 / 100;
  const q = 1 - p;

  return toHex(r1 * p + r2 * q, g1 * p + g2 * q, b1 * p + b2 * q);
}
