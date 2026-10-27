const STANDARD_FAMILIES: Record<string, string> = {
  Helvetica: 'Helvetica, Arial, sans-serif',
  Courier: '"Courier New", Courier, monospace',
  Times: '"Times New Roman", Times, serif',
};

export type FontFace = {
  family: string;
  bold: boolean;
  italic: boolean;
};

type FontLike = {
  fullName?: string;
  postscriptName?: string;
  unitsPerEm?: number;
};

export const resolveFontFace = (font: unknown): FontFace => {
  const name =
    typeof font === 'string'
      ? font
      : (font as FontLike | null)?.fullName ??
        (font as FontLike | null)?.postscriptName ??
        '';
  const base = name.split('-')[0];
  return {
    family: STANDARD_FAMILIES[base] ?? (name || 'sans-serif'),
    bold: /Bold/.test(name),
    italic: /Italic|Oblique/.test(name),
  };
};

export const unitsPerEmOf = (font: unknown): number =>
  (typeof font === 'object' &&
    font !== null &&
    (font as FontLike).unitsPerEm) ||
  1000;

export type SVGGlyph = {
  path?: { toSVG: () => string };
  codePoints?: number[];
};

export type SVGGlyphPosition = {
  xAdvance?: number;
  xOffset?: number;
  yOffset?: number;
};
