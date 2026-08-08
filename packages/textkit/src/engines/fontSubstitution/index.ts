import { last } from '@react-pdf/fns';
import { AttributedString, Font, Run } from '../../types';

const IGNORED_CODE_POINTS = [173]; // U+00AD Soft Hyphen

const getFontSize = (run: Run) => run.attributes.fontSize || 12;

const pickFontFromFontStack = (
  codePoint: number,
  fontStack: Font[],
  lastFont?: Font,
) => {
  if (IGNORED_CODE_POINTS.includes(codePoint)) return lastFont;

  const fontStackWithFallback = [...fontStack, lastFont];

  for (let i = 0; i < fontStackWithFallback.length; i += 1) {
    const font = fontStackWithFallback[i];
    if (
      font &&
      font.hasGlyphForCodePoint &&
      font.hasGlyphForCodePoint(codePoint)
    ) {
      return font;
    }
  }

  return fontStack.at(-1);
};

const fontSubstitution =
  () =>
  ({ string, runs }: AttributedString) => {
    let lastFont: Font | null = null;
    let lastFontSize: number | null = null;
    let lastIndex = 0;
    let index = 0;

    const res: Run[] = [];

    for (let i = 0; i < runs.length; i += 1) {
      const run = runs[i];

      if (string.length === 0) {
        res.push({
          start: 0,
          end: 0,
          attributes: { font: run.attributes.font },
        });
        break;
      }

      const chars = string.slice(run.start, run.end);

      // Iterate by code point so that surrogate pairs (e.g. SIP characters
      // U+10000 and above) are looked up as a single code point in the font
      // stack, not as separate high/low surrogates.
      let j = 0;
      while (j < chars.length) {
        const codePoint = chars.codePointAt(j)!;
        const charLength = codePoint > 0xffff ? 2 : 1;

        // If the default font does not have a glyph and the fallback font does, we use it
        const font = pickFontFromFontStack(
          codePoint,
          run.attributes.font,
          lastFont,
        );

        const fontSize = getFontSize(run);

        // If anything that would impact res has changed, update it
        if (
          font !== lastFont ||
          fontSize !== lastFontSize ||
          font.unitsPerEm !== lastFont?.unitsPerEm
        ) {
          if (lastFont) {
            res.push({
              start: lastIndex,
              end: index,
              attributes: {
                font: [lastFont],
                scale: lastFontSize / lastFont.unitsPerEm,
              },
            });
          }

          lastFont = font;
          lastFontSize = fontSize;
          lastIndex = index;
        }

        j += charLength;
        index += charLength;
      }
    }

    if (lastIndex < string.length) {
      const fontSize = getFontSize(last(runs));

      res.push({
        start: lastIndex,
        end: string.length,
        attributes: {
          font: [lastFont],
          scale: fontSize / lastFont.unitsPerEm,
        },
      });
    }

    return { string, runs: res } as AttributedString;
  };

export default fontSubstitution;
