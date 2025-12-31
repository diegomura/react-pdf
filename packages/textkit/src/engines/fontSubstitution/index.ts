import { last } from '@react-pdf/fns';
import { AttributedString, Font, Run } from '../../types';

const IGNORED_CODE_POINTS = [173];

const getFontSize = (run: Run) => run.attributes.fontSize || 12;

const pickFontFromFontStack = (
  codePoint: number,
  fontStack: Font[],
  lastFont?: Font,
) => {
  const fontStackWithFallback = [...fontStack, lastFont];
  for (let i = 0; i < fontStackWithFallback.length; i += 1) {
    const font = fontStackWithFallback[i];
    if (
      !IGNORED_CODE_POINTS.includes(codePoint) &&
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

      for (let j = 0; j < chars.length; j += 1) {
        const char = chars[j];
        const codePoint = char.codePointAt(0);
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

        index += char.length;
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
