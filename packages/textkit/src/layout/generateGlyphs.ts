import scale from '../run/scale';
import resolveStringIndices from '../string-indices/resolve';
import resolveGlyphIndices from '../glyph-indices/resolve';
import { AttributedString, Position, Run } from '../types';

const getCharacterSpacing = (run: Run) => {
  return run.attributes?.characterSpacing || 0;
};

const PATCHED = '__rpdfAdoptsCodePoints';

/**
 * Make a font's glyph cache keep the code points it is handed.
 *
 * fontkit caches one glyph object per glyph id, and whoever asks for it FIRST
 * decides what that object will ever know: `getGlyph(id, codePoints)` ignores
 * the code points when the id is already cached. Subsetting a composite glyph
 * asks for its components by id alone - "Ö" pulls in "O" and the diaeresis - so
 * the component ends up cached with an empty `codePoints` array.
 *
 * The font object outlives the document it was first used in. From the second
 * PDF of a process onwards, a plain "O" therefore IS that empty glyph, and two
 * things break at once:
 *
 *   - resolveGlyphIndices() counts characters by `codePoints.length`, so a
 *     glyph with none does not advance the counter. Every glyph after it maps
 *     to the wrong character, which is what puts a line break or a hyphen one
 *     letter off - and it drifts further with every such glyph.
 *
 *   - the glyph reaches the ToUnicode map with no code point at all, so the
 *     text is drawn correctly but cannot be copied, searched or read aloud.
 *
 * Both are the same missing information, so it is restored here, where the
 * caller still knows which characters it asked for. A glyph that is legitimately
 * without code points - one INSERTED by the shaper, with no character behind it
 * - is untouched, because there the caller passes nothing either.
 */
const adoptCodePoints = (font: any) => {
  if (!font || font[PATCHED] || typeof font.getGlyph !== 'function') return;

  const original = font.getGlyph.bind(font);

  font.getGlyph = (id: number, characters: number[] = []) => {
    const glyph = original(id, characters);

    if (glyph && characters.length > 0 && !glyph.codePoints?.length) {
      glyph.codePoints = characters;
    }

    return glyph;
  };

  font[PATCHED] = true;
};

/**
 * Scale run positions
 *
 * @param  run
 * @param  positions
 * @returns Scaled positions
 */
const scalePositions = (run: Run, positions: Position[]): Position[] => {
  const runScale = scale(run);
  const characterSpacing = getCharacterSpacing(run);

  return positions.map((position, i) => {
    const isLast = i === positions.length;
    const xSpacing = isLast ? 0 : characterSpacing;

    return {
      xAdvance: position.xAdvance * runScale + xSpacing,
      yAdvance: position.yAdvance * runScale,
      xOffset: position.xOffset * runScale,
      yOffset: position.yOffset * runScale,
      advanceWidth: position.advanceWidth,
    };
  });
};

/**
 * Create glyph run
 *
 * @param string string
 */
const layoutRun = (string: string) => {
  /**
   * @param run - Run
   * @returns Glyph run
   */
  return (run: Run) => {
    const { start, end, attributes = {} } = run;
    const { font, features } = attributes;

    if (!font)
      return {
        ...run,
        glyphs: [],
        stringIndices: [],
        glyphIndices: [],
        positions: [],
      };

    const runString = string.slice(start, end);

    if (typeof font === 'string') throw new Error('Invalid font');

    adoptCodePoints(font[0]);

    // passing LTR To force fontkit to not reverse the string
    const glyphRun = font[0].layout(
      runString,
      features,
      undefined,
      undefined,
      'ltr',
    );

    const positions = scalePositions(run, glyphRun.positions);
    const stringIndices = resolveStringIndices(glyphRun.glyphs);
    const glyphIndices = resolveGlyphIndices(glyphRun.glyphs);

    const result: Run = {
      ...run,
      positions,
      stringIndices,
      glyphIndices,
      glyphs: glyphRun.glyphs,
    };

    return result;
  };
};

/**
 * Generate glyphs for single attributed string
 */
const generateGlyphs = () => {
  /**
   * @param attributedString - Attributed string
   * @returns Attributed string with glyphs
   */
  return (attributedString: AttributedString) => {
    const runs = attributedString.runs.map(layoutRun(attributedString.string));
    const res: AttributedString = Object.assign({}, attributedString, { runs });
    return res;
  };
};

export default generateGlyphs;
