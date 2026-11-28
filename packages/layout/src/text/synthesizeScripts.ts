import { Font, Fragment } from '@react-pdf/textkit';

const SCRIPT_CHARS = /[⁰-₟]/;

const SCALE = 0.65;

const hasGlyph = (fonts: Font[], char: string) => {
  const codePoint = char.codePointAt(0)!;
  return fonts.some((font) => font?.hasGlyphForCodePoint?.(codePoint));
};

const MINUS = '−';

// Superscript and subscript minus decompose to U+2212, which standard fonts
// lack, so fall back to a hyphen.
const getBase = (fonts: Font[], char: string) => {
  const base = char.normalize('NFKD');
  if (base === MINUS && !hasGlyph(fonts, MINUS)) return '-';
  return base;
};

const getVerticalAlign = (char: string) =>
  char.codePointAt(0)! < 0x2080 ? 'super' : 'sub';

const synthesizeFragment = (fragment: Fragment): Fragment[] => {
  const { string, attributes } = fragment;

  if (!SCRIPT_CHARS.test(string)) return [fragment];

  const fonts = attributes.font || [];
  const fontSize = attributes.fontSize || 18;
  const result: Fragment[] = [];
  let plain = '';

  const flushPlain = () => {
    if (plain) result.push({ string: plain, attributes });
    plain = '';
  };

  for (const char of string) {
    const base = getBase(fonts, char);

    if (
      !SCRIPT_CHARS.test(char) ||
      base === char ||
      hasGlyph(fonts, char) ||
      !hasGlyph(fonts, base)
    ) {
      plain += char;
      continue;
    }

    flushPlain();

    const verticalAlign = getVerticalAlign(char);
    const previous = result.at(-1);

    if (
      previous &&
      previous.attributes !== attributes &&
      previous.attributes.verticalAlign === verticalAlign
    ) {
      previous.string += base;
    } else {
      result.push({
        string: base,
        attributes: {
          ...attributes,
          fontSize: fontSize * SCALE,
          verticalAlign,
        },
      });
    }
  }

  flushPlain();

  return result;
};

/**
 * Replaces Unicode superscript and subscript characters that no font in the
 * stack can draw with their base character, shrunk and shifted the same way
 * as `verticalAlign: 'super' | 'sub'`.
 */
const synthesizeScripts = (fragments: Fragment[]): Fragment[] =>
  fragments.flatMap(synthesizeFragment);

export default synthesizeScripts;
